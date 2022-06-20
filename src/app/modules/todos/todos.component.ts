import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {PostApiService} from "@services/api/post-api/post-api.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@services/user/user.service";
import {MessageDialogComponent} from "../../common/modules/modals/message-dialog/message-dialog.component";
import {MessageModalType} from "@models/enums/message-modal-type.enum";
import {IMessageModal} from "@models/interfaces/modal/message-modal.inteface";
import {filter} from "rxjs/operators";
import {EntityDialogComponent} from "../../common/modules/modals/entity-dialog/entity-dialog.component";
import {EntityModalType} from "@models/enums/entity-modal-type";
import {IEntityModal} from "@models/interfaces/modal/entity-modal.inteface";
import {ITodo} from "@models/interfaces/todo.interface";
import {TodoApiService} from "@services/api/todo-api/todo-api.service";
import {ModeType} from "@models/enums/mode-type";
import {BreadcrumbsService} from "@services/breadcrumbs/breadcrumbs.service";
import {IUser} from "@models/interfaces/user.interface";
import {UserApiService} from "@services/api/user-api/user-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarNotificationType} from "@models/enums/snack-bar-notification-type.enum";

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  readonly ModeType: typeof ModeType = ModeType;
  displayedColumns: string[] = ['id', 'checkbox', 'title', 'actions'];
  dataSource: MatTableDataSource<ITodo>;
  userId: number;
  user: IUser;
  isLoading: boolean = true;
  pageSizes: number[] = [10];
  fullBreadCrumbs: boolean = true;
  mode: ModeType;

  constructor(
    private _postsApi: PostApiService,
    private _todosApi: TodoApiService,
    protected dialog: MatDialog,
    private _router: Router,
    private _user: UserService,
    private _breadcrumbs: BreadcrumbsService,
    private _route: ActivatedRoute,
    private _userApi: UserApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = +this._route?.parent?.snapshot.params['id'];
    if (!this.userId) {
      this.fullBreadCrumbs = false;
      this.userId = this._user.getUserId();
    }
    this.mode = this._user.getMode(this.userId);

    this.getTodos();
  }

  getTodos(): void {
    this._todosApi.getItems(this.userId).subscribe((todos: ITodo[]): void => {
      this.dataSource = new MatTableDataSource(todos);
      this.dataSource.paginator = this.paginator;

      this._userApi.getItem(this.userId).subscribe((user: IUser): void => {
        this.user = user;
        this._setBreadcrumbs();
        this.isLoading = false;
      }, (error) => this.errorAction(error));
    }, (error) => this.errorAction(error));
  }

  deleteTodo(id: number): void {
    this.dialog
      .open(MessageDialogComponent, {
        autoFocus: false,
        data: {
          title: 'Delete this todo?',
          type: MessageModalType.confirm,
          buttonsNames: {
            approve: 'Delete',
            decline: 'Cancel'
          }
        } as IMessageModal
      })
      .afterClosed()
      .pipe(
        filter((res: boolean): boolean => res)
      )
      .subscribe((): void => {
        this.isLoading = true;
        this._todosApi.deleteItem(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter((e: ITodo): boolean => e.id !== id);
          this.isLoading = false;
          this.showMessage(SnackBarNotificationType.success, 'Todo has been deleted');
        }, (error) => this.errorAction(error));
      });
  }

  createTodo(): void {
    this.dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Create new todo',
          entityType: EntityModalType.todo,
          buttonsNames: {
            approve: 'Create',
            decline: 'Cancel'
          }
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((newTodo): void => {
        if (newTodo) {
          this.isLoading = true;
          this._todosApi.createItem(newTodo).subscribe((addedTodo: ITodo) => {
            this.dataSource.data = [...this.dataSource.data, addedTodo];
            this.isLoading = false;
            this.showMessage(SnackBarNotificationType.success, 'Todo has been created');
          }, (error) => this.errorAction(error));
        }
      });
  }

  editTodo(selectedTodo: ITodo): void {
    this.dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'Edit todo',
          entityType: EntityModalType.todo,
          todo: Object.assign({}, selectedTodo),
          buttonsNames: {
            approve: 'Edit',
            decline: 'Cancel'
          }
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((editedTodo): void => {
        if (editedTodo) {
          this.isLoading = true;
          this._todosApi.updateItem(editedTodo).subscribe((updatedTodo: ITodo) => {
            const index = this.dataSource.data.findIndex(e => e.id === updatedTodo.id);
            this.dataSource.data.splice(index, 1, updatedTodo);
            this.dataSource._updateChangeSubscription();
            this.isLoading = false;
            this.showMessage(SnackBarNotificationType.success, 'Todo has been edited');
          }, (error) => this.errorAction(error));
        }
      });
  }

  toggleState(id: number, value: boolean): void {
    if (this.mode === ModeType.edit) {
      this.isLoading = true;
      this._todosApi.patchItem(id, {completed: !value}).subscribe((value) => {
        const index: number = this.dataSource.data.findIndex(e => e.id === value.id);
        this.dataSource.data[index].completed = value.completed;
        this.isLoading = false;
      }, (error) => this.errorAction(error));
    }
  }

  errorAction(error: Error): void {
    console.log('Error: ', error);
    this.isLoading = false;
    this.showMessage(SnackBarNotificationType.error, 'Something wrong...');
  }

  private _setBreadcrumbs(): void {
    if (!this._breadcrumbs.breadcrumbs$.value?.length) {

      if (this.fullBreadCrumbs) {
        this._breadcrumbs.add({
          name: 'Users',
          url: `/users`
        });
        this._breadcrumbs.add({
          name: this.user.name,
          url: `/users/${this.user.id}`
        });
      }

      this._breadcrumbs.add({
        name: 'Todos',
        url: ''
      });
    }
  }

  showMessage(result: SnackBarNotificationType, message: string) {
    this._snackBar.open(message, undefined, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: result
    });
  }
}

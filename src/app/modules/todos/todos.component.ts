import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PostApiService } from '@services/api/post-api/post-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { MessageDialogComponent } from '@modals/message-dialog/message-dialog.component';
import { MessageModalType } from '@models/enums/message-modal-type.enum';
import { IMessageModal } from '@models/interfaces/modal/message-modal.inteface';
import { filter } from 'rxjs/operators';
import { EntityDialogComponent } from '@modals/entity-dialog/entity-dialog.component';
import { EntityModalType } from '@models/enums/entity-modal-type';
import { IEntityModal } from '@models/interfaces/modal/entity-modal.inteface';
import { ITodo } from '@models/interfaces/todo.interface';
import { TodoApiService } from '@services/api/todo-api/todo-api.service';
import { ModeType } from '@models/enums/mode-type';
import { BreadcrumbsService } from '@services/breadcrumbs/breadcrumbs.service';
import { IUser } from '@models/interfaces/user.interface';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarNotificationType } from '@models/enums/snack-bar-notification-type.enum';
import { Observable } from 'rxjs';
import { BaseItemAbstractComponent } from '@misc/abstracts/base-item.abstract.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent extends BaseItemAbstractComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'checkbox', 'title', 'actions'];
  dataSource: MatTableDataSource<ITodo>;
  pageSizes: number[] = [10];

  constructor(
    snackBar: MatSnackBar,
    user: UserService,
    route: ActivatedRoute,
    translate: TranslateService,
    private _postsApi: PostApiService,
    private _todosApi: TodoApiService,
    private _dialog: MatDialog,
    private _router: Router,
    private _breadcrumbs: BreadcrumbsService,
    private _userApi: UserApiService
  ) {
    super(snackBar, user, route, translate);
  }

  ngOnInit(): void {
    this.defineParams();

    this.getTodos();
  }

  getTodos(): void {
    this._todosApi.getItems(this.userId).subscribe(
      (todos: ITodo[]): void => {
        this.dataSource = new MatTableDataSource(todos);
        this.dataSource.paginator = this.paginator;

        this._userApi.getItem(this.userId).subscribe(
          (user: IUser): void => {
            this.user = user;
            this._setBreadcrumbs();
          },
          error => this.errorAction(error)
        );
      },
      error => this.errorAction(error)
    );
  }

  deleteTodo(id: number): void {
    this._dialog
      .open(MessageDialogComponent, {
        autoFocus: false,
        data: {
          title: 'MODAL.DELETE_TODO',
          type: MessageModalType.confirm,
          buttonsNames: {
            approve: 'BUTTONS.DELETE',
            decline: 'BUTTONS.CANCEL'
          },
          submitHandler: (): Observable<object> => this._todosApi.deleteItem(id)
        } as IMessageModal
      })
      .afterClosed()
      .pipe(filter((res: boolean): boolean => res))
      .subscribe((answer): void => {
        if (answer) {
          this.dataSource.data = this.dataSource.data.filter((e: ITodo): boolean => e.id !== id);
          this.showMessage(SnackBarNotificationType.success, this._translate.instant('MESSAGES.TODO_DELETED'));
        }
      });
  }

  createTodo(): void {
    this._dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'MODAL.CREATE_TODO',
          entityType: EntityModalType.todo,
          buttonsNames: {
            approve: 'BUTTONS.CREATE',
            decline: 'BUTTONS.CANCEL'
          },
          submitHandler: (item: ITodo): Observable<ITodo> => this._todosApi.createItem(item)
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((newTodo: ITodo): void => {
        if (newTodo) {
          this.dataSource.data = [...this.dataSource.data, newTodo];
          this.showMessage(SnackBarNotificationType.success, this._translate.instant('MESSAGES.TODO_CREATED'));
        }
      });
  }

  editTodo(selectedTodo: ITodo): void {
    this._dialog
      .open(EntityDialogComponent, {
        autoFocus: false,
        disableClose: true,
        data: {
          title: 'MODAL.EDIT_TODO',
          entityType: EntityModalType.todo,
          todo: Object.assign({}, selectedTodo),
          buttonsNames: {
            approve: 'BUTTONS.EDIT',
            decline: 'BUTTONS.CANCEL'
          },
          submitHandler: (item: ITodo): Observable<ITodo> => this._todosApi.updateItem(item)
        } as IEntityModal
      })
      .afterClosed()
      .subscribe((editedTodo: ITodo): void => {
        if (editedTodo) {
          const index = this.dataSource.data.findIndex(e => e.id === editedTodo.id);
          this.dataSource.data.splice(index, 1, editedTodo);
          this.dataSource._updateChangeSubscription();
          this.showMessage(SnackBarNotificationType.success, this._translate.instant('MESSAGES.TODO_EDITED'));
        }
      });
  }

  toggleState(id: number, value: boolean): void {
    if (this.mode === ModeType.edit) {
      this._todosApi.patchItem(id, { completed: !value }).subscribe(
        value => {
          const index: number = this.dataSource.data.findIndex(e => e.id === value.id);
          this.dataSource.data[index].completed = value.completed;
        },
        error => this.errorAction(error)
      );
    }
  }

  private _setBreadcrumbs(): void {
    if (!this._breadcrumbs.breadcrumbs$.value?.length) {
      if (this.fullBreadCrumbs) {
        this._breadcrumbs.add({
          name: 'BREAD_CRUMBS.USERS',
          url: `/users`
        });
        this._breadcrumbs.add({
          name: this.user.name,
          url: `/users/${this.user.id}`
        });
      }

      this._breadcrumbs.add({
        name: 'BREAD_CRUMBS.TODOS',
        url: ''
      });
    }
  }
}

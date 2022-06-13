import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {PostApiService} from "@services/api/post-api/post-api.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
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

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @Input() userId: number;
  @Input() mode: ModeType = ModeType.edit;
  readonly ModeType: typeof ModeType = ModeType;
  displayedColumns: string[] = ['id', 'checkbox', 'title', 'actions'];
  dataSource: MatTableDataSource<ITodo>;

  isLoading: boolean = true;
  pageSizes: number[] = [10];

  constructor(
    private _postsApi: PostApiService,
    private _todosApi: TodoApiService,
    protected dialog: MatDialog,
    private _router: Router,
    private _user: UserService,
  ) {}

  ngOnInit(): void {
    if (!this.userId) {
      this.userId = this._user.getUserId();
    }

    this.getTodos();
  }

  getTodos(): void {
    this._todosApi.getItems(this.userId).subscribe((todos: ITodo[]): void => {
      this.dataSource = new MatTableDataSource(todos);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false
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
          todo: selectedTodo,
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
            this.dataSource.data = [...this.dataSource.data, updatedTodo];
            this.isLoading = false;
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
  }
}

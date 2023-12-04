import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TasksFacade } from '@client/core-state';
import { CreateTodo, Task, Todo } from '@client/shared/interfaces';
import { Subject, debounce, interval, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'plan-todo-list-check',
  templateUrl: './list-check.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTodoListCheckComponent implements OnInit, OnDestroy {
  @Input() permissionTodo: boolean;
  @Input() todos: Todo[];
  @Input() taskId: number;

  todoChanged: Subject<Todo> = new Subject<Todo>();
  disbaleTodo: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private readonly _tasksFacade: TasksFacade) {}

  ngOnInit(): void {
    this.todoChanged
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounce(() => interval(300)),
        tap((todo) => {
          this._tasksFacade.updateTodo(todo);
        }),
      )
      .subscribe(() => {
        this.disbaleTodo = false;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  updateTodoOnTask(todo: Todo) {
    this.todoChanged.next(todo);
    this.disbaleTodo = true;
  }

  addTodoOnTask(task: Task, value: string) {
    if (value.trim() === '') return;

    const createTodoData: CreateTodo = {
      content: value,
      isDone: false,
      task: {
        connect: { id: this.taskId },
      },
    };

    this._tasksFacade.createTodo(createTodoData);
  }

  removeTodoOnTask(todoId: number) {
    this._tasksFacade.deleteTodo(todoId);
  }
}

import { AsyncPipe, NgClass, NgFor, NgIf, PercentPipe } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TasksFacade } from '@client/core-state';
import { CreateTodo, Task, Todo } from '@client/shared/interfaces';
import { LetDirective, PushPipe } from '@ngrx/component';
import { cloneDeep } from 'lodash-es';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounce,
  interval,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { PlanTodoNotFoundComponent } from '../../components/not-found/not-found.component';
import { PlanTodoCommentComponent } from '../../components/comment/comment.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'plan-todo-mode-view',
  templateUrl: './plan-todo-mode-view.component.html',
  standalone: true,
  imports: [
    PlanTodoNotFoundComponent,
    PlanTodoCommentComponent,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressBarModule,
    FormsModule,
    NgClass,
    NgIf,
    NgFor,
    LetDirective,
    PushPipe,
    AsyncPipe,
    PercentPipe,
  ],
})
export class PlanTodoModeViewComponent implements OnInit, OnDestroy {
  @Input() permissionTodo: boolean;

  task$: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
  todoChanged: Subject<Todo> = new Subject<Todo>();
  disbaleTodo: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private readonly _tasksFacade: TasksFacade,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._tasksFacade.selectedTask$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((task) => {
        this.task$.next(cloneDeep(task));
      });

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

  /**
   * Progress Todo
   */
  get progressTodo(): Observable<number> {
    return this.task$.pipe(
      map((task) => {
        if (task.todos.length === 0) return 0;
        return (
          task.todos.filter((todo) => todo.isDone).length / task.todos.length
        );
      }),
    );
  }

  updateTodoOnTask(todo: Todo, task: Task, event: InputEvent) {
    // if event not typing content can this.todoChange.next
    this.todoChanged.next(todo);
    this.disbaleTodo = true;
  }

  addTodoOnTask(task: Task, value: string) {
    if (value.trim() === '') return;

    const createTodoData: CreateTodo = {
      content: value,
      isDone: false,
      Task: {
        connect: { id: task.id },
      },
    };

    this._tasksFacade.createTodo(createTodoData);
  }

  removeTodoOnTask(todoId: number) {
    // this._tasksFacade.removeTodoOnTask(todo);
  }
}

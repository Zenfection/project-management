import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TasksFacade } from '@client/core-state';
import { Task } from '@client/shared/interfaces';
import { cloneDeep } from 'lodash-es';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'plan-todo-mode-view',
  templateUrl: './plan-todo-mode-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTodoModeViewComponent implements OnInit, OnDestroy {
  @Input() permissionTodo: boolean;
  @Output() editMode: EventEmitter<boolean> = new EventEmitter<boolean>();

  task$: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);

  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(private readonly _tasksFacade: TasksFacade) {}

  ngOnInit(): void {
    this._tasksFacade.selectedTask$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((task) => {
        this.task$.next(cloneDeep(task));
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Change View Mode
   */
  toggleEditMode(value: boolean) {
    this.editMode.emit(value);
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
}

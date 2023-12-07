import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TasksFacade } from '@client/core-state';
import { Task } from '@client/shared/interfaces';
import { Observable, map } from 'rxjs';
import { PlanDialogsTaskComponent } from '../../../dialogs/task/plan-dialogs-task.component';

@Component({
  selector: 'plan-details-tabs-tasks',
  templateUrl: './plan-details-tabs-tasks.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailsTabsTasksComponent implements OnInit {
  tasks$: Observable<Task[]> = this._taskFacade.tasks$;

  tasks: Task[];

  @Input() permissionPlan: boolean;

  constructor(
    private _matDialog: MatDialog,
    private readonly _taskFacade: TasksFacade,
  ) {}

  ngOnInit(): void {
    this.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  percentCompleteTask(taskId: number): Observable<number> {
    return this.tasks$.pipe(
      map((tasks) => {
        const task = tasks.find((task) => task.id === taskId);
        if (task.todos.length === 0) return 0;
        const percent =
          task.todos.filter((todo) => todo.isDone).length / task.todos.length;
        return percent;
      }),
    );
  }

  openTaskDialog(): void {
    this._matDialog.open(PlanDialogsTaskComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        task: {},
      },
    });
  }
}

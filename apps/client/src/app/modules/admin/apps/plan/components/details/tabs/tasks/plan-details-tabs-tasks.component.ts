import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TasksFacade } from '@client/core-state';
import { Task } from '@client/shared/interfaces';
import { Observable, map } from 'rxjs';
import { PlanTaskDialogComponent } from '../../../dialogs/task.dialog/task-dialog.component';

@Component({
  selector: 'plan-details-tabs-tasks',
  templateUrl: './plan-details-tabs-tasks.component.html',
})
export class PlanDetailsTabsTasksComponent {
  tasks$: Observable<Task[]> = this._taskFacade.tasks$;
  @Input() permissionPlan: boolean;

  constructor(
    private _matDialog: MatDialog,
    private readonly _taskFacade: TasksFacade,
  ) {}

  percentCompleteTask(taskId: number): Observable<number> {
    return this.tasks$.pipe(
      map((tasks) => {
        const task = tasks.find((task) => task.id === taskId);
        const percent =
          (task.todos.filter((todo) => todo.isDone).length /
            task.todos.length) *
          100;
        return percent;
      }),
    );
  }

  openTaskDialog(): void {
    this._matDialog.open(PlanTaskDialogComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        task: {},
      },
    });
  }
}

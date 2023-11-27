import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlansFacade, TasksFacade } from '@client/core-state';
import { Task, Member } from '@client/shared/interfaces';
import { Observable, map } from 'rxjs';
import { PlanDialogsTaskComponent } from '../../../dialogs/task/plan-dialogs-task.component';

@Component({
  selector: 'plan-details-tabs-tasks',
  templateUrl: './plan-details-tabs-tasks.component.html',
})
export class PlanDetailsTabsTasksComponent implements OnInit {
  tasks$: Observable<Task[]> = this._taskFacade.tasks$;
  planId: number;
  members: Member[];

  tasks: Task[];

  @Input() permissionPlan: boolean;

  constructor(
    private _matDialog: MatDialog,
    private readonly _taskFacade: TasksFacade,
    private readonly _planFacade: PlansFacade,
  ) {}

  ngOnInit(): void {
    this.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });

    this._planFacade.selectedPlan$.subscribe((plan) => {
      this.planId = plan.id;
      this.members = plan.members;
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
        planId: this.planId,
        members: this.members,
      },
    });
  }
}

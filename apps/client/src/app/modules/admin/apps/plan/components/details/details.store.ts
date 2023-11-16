import { PlanTasks } from '@client/shared/interfaces';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { PlanTasksService } from '../../services/plan-tasks.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlanDetailsStore extends ComponentStore<PlanTasks> {
  constructor(private planTasksService: PlanTasksService) {
    super({ planTasks: [] });
  }

  // side effects
  // readonly loadPlanTasks = this.effect((id$: Observable<string>) =>
  //   id$.pipe(
  //     switchMap((id) =>
  //       this.planTasksService.getPlanTasks(id).pipe(
  //         tap((planTasks) => this.setPlanTasks(planTasks)),
  //         catchError((error) => {
  //           console.error(error);
  //           return throwError(error);
  //         }),
  //       ),
  //     ),
  //   ),
  // );
}

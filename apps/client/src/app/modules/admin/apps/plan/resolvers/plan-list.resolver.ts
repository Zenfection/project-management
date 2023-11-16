import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PlanService } from '../services/plan.service';
import { Plan } from '@client/shared/interfaces';

export const planListResolver: ResolveFn<Plan[]> = (route, state) => {
  const planService = inject(PlanService);
  return planService.getPlans();
};

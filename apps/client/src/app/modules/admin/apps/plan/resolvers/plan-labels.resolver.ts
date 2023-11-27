import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PlanService } from '../plan.service';
import { Label } from '@client/shared/interfaces';

export const planLabelsResolver: ResolveFn<Label[]> = (route, state) => {
  const planService = inject(PlanService);

  return planService.getLabels();
};

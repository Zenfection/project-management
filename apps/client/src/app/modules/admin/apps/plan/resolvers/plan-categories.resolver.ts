import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PlanService } from '../plan.service';
import { CategoryPlan } from '@client/shared/interfaces';

export const planCategoriesResolver: ResolveFn<CategoryPlan[]> = (
  route,
  state,
) => {
  const planService = inject(PlanService);

  return planService.getCategories();
};

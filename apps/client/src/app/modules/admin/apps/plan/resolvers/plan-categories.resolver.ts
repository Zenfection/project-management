import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PlanService } from '../plan.service';
import { Category } from '@client/shared/interfaces';

export const planCategoriesResolver: ResolveFn<Category[]> = (route, state) => {
  const planService = inject(PlanService);

  return planService.getCategories();
};

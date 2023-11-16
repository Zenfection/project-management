import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Category } from '../models/category.types';
import { PlanService } from '../services/plan.service';

export const planCategoriesResolver: ResolveFn<Category[]> = (route, state) => {
  const planService = inject(PlanService);

  return planService.getCategories();
};

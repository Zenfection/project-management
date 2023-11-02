import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PlanCategoriesService } from '../services/plan-categories.service';
import { Category } from '../models/category.types';

export const planCategoriesResolver: ResolveFn<Category[]> = (route, state) => {
  const planCategoriesService = inject(PlanCategoriesService);

  return planCategoriesService.getCategories();
};

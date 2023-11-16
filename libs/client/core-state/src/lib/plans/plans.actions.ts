import { createAction, props } from '@ngrx/store';
import { Category, CreatePlan, Plan } from '@client/shared/interfaces';

export const loadPlansSuccess = createAction(
  '[Plan] Load Plans Success',
  props<{ plans: Plan[] }>(),
);

export const createPlan = createAction(
  '[Plan] Create Plan',
  props<{ plan: CreatePlan }>(),
);

export const createPlanSuccess = createAction(
  '[Plan] Create Plan Success',
  props<{ plan: Plan }>(),
);

export const createPlanFailure = createAction(
  '[Plan] Create Plan Failure',
  props<{ error: { message: string } }>(),
);

export const selectPlan = createAction(
  '[Plan] Select Plan',
  props<{ plan: Plan }>(),
);

export const loadCategoriesSuccess = createAction(
  '[Plan] Load Categories Success',
  props<{ categories: Category[] }>(),
);

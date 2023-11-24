import { createAction, props } from '@ngrx/store';
import {
  CategoryPlan,
  CreatePlan,
  Plan,
  UpdatePlan,
} from '@client/shared/interfaces';

//TODO: PLAN ACTIONS -----------
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

export const updatePlan = createAction(
  '[Plan] Update Plan',
  props<{ plan: UpdatePlan }>(),
);

export const updatePlanSuccess = createAction(
  '[Plan] Update Plan Success',
  props<{ plan: Plan }>(),
);

export const updatePlanFailure = createAction(
  '[Plan] Update Plan Failure',
  props<{ error: { message: string } }>(),
);

//TODO Categories Plan Actions
export const loadCategoriesSuccess = createAction(
  '[Plan] Load Categories Success',
  props<{ categories: CategoryPlan[] }>(),
);

//! Delete Plan
export const deletePlan = createAction('[Plan] Delete Plan');

export const deletePlanSuccess = createAction(
  '[Plan] Delete Plan Success',
  props<{ plan: Plan }>(),
);

export const deletePlanFailure = createAction(
  '[Plan] Delete Plan Failure',
  props<{ error: { message: string } }>(),
);

import { createAction, props } from '@ngrx/store';
import { Plan } from '@client/shared/interfaces';

export const loadPlans = createAction('[Plan] Load Plans');

export const loadPlansSuccess = createAction(
  '[Plan] Load Plans Success',
  props<{ plans: Plan[] }>()
);

export const selectPlan = createAction(
  '[Plan] Select Plan',
  props<{ plan: Plan }>()
);

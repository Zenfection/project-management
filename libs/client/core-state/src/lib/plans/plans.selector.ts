import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlansState, adapter } from './plans.reducer';

const { selectAll } = adapter.getSelectors();

export const selectPlanState = createFeatureSelector<PlansState>('plans');
export const selectAllPlans = createSelector(selectPlanState, selectAll);

export const selectSelectedPlan = createSelector(
  selectPlanState,
  (planState: PlansState) => planState.entities[planState.selectedPlanId],
);

export const selectCategories = createSelector(
  selectPlanState,
  (planState: PlansState) => planState.categories,
);

export const selectPlanId = createSelector(
  selectPlanState,
  (planState: PlansState) => planState.selectedPlanId,
);

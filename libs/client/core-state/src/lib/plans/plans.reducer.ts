import * as PlanActions from './plans.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Plan } from '@client/shared/interfaces';

//1. Define the shape of state
export interface PlansState {
  plans: Plan[];
  selectedPlan: Plan | null;
  // planTasks: PlanTasks[];
  // selectTasks: PlanTasks | null;
}

//2. Define the initial state
export const initialState: PlansState = {
  plans: [],
  selectedPlan: null,
};

//3. Define the reducer function
export function plansReducer(
  state: PlansState = initialState,
  action: any
): PlansState {
  switch (action.type) {
    case PlanActions.loadPlansSuccess.type:
      return {
        ...state,
        plans: action.plans,
      };
    case PlanActions.selectPlan.type:
      return {
        ...state,
        selectedPlan: action.plan,
      };
    default:
      return state;
  }
}

export const selectPlanState = createFeatureSelector<PlansState>('plans');
export const selectAllPlans = createSelector(
  selectPlanState,
  (planState: PlansState) => planState.plans
);

export const selectSelectedPlan = createSelector(
  selectPlanState,
  (planState: PlansState) => planState.selectedPlan
);

import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import * as PlanActions from './plans.actions';
import { Category, Plan } from '@client/shared/interfaces';
import { createReducer, on } from '@ngrx/store';

//1. Define the shape of state
export interface PlansState extends EntityState<Plan> {
  selectedPlan: Plan;
  categories: Category[];
}

//2. Define the initial state
export const adapter: EntityAdapter<Plan> = createEntityAdapter<Plan>();
export const initialState: PlansState = adapter.getInitialState({
  selectedPlan: null,
  categories: [],
});

//3. Define the reducer function
export const plansReducer = createReducer(
  initialState,
  on(PlanActions.loadPlansSuccess, (state, action): PlansState => {
    return adapter.setAll(action.plans, state);
  }),

  on(PlanActions.selectPlan, (state, action): PlansState => {
    return adapter.setOne(action.plan, {
      ...state,
      selectedPlan: action.plan,
    });
  }),

  on(PlanActions.createPlanSuccess, (state, action): PlansState => {
    return adapter.addOne(action.plan, state);
  }),

  on(PlanActions.loadCategoriesSuccess, (state, action): PlansState => {
    return {
      ...state,
      categories: action.categories,
    };
  }),
);

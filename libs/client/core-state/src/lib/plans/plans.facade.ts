import * as PlanAction from './plans.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CategoryPlan,
  CreatePlan,
  Member,
  Plan,
  UpdatePlan,
} from '@client/shared/interfaces';
import { Observable } from 'rxjs';
import {
  isOwnerSelectedPlan,
  selectAllPlans,
  selectCategories,
  selectMembersSelectedPlan,
  selectPlanId,
  selectSelectedPlan,
} from './plans.selector';

@Injectable({
  providedIn: 'root',
})
export class PlansFacade {
  plans$: Observable<Plan[]> = this.store.select(selectAllPlans);
  categories$: Observable<CategoryPlan[]> = this.store.select(selectCategories);
  selectedPlan$: Observable<Plan> = this.store.select(selectSelectedPlan);
  selectedPlanId$: Observable<number> = this.store.select(selectPlanId);
  isOwnerSelectedPlan$: Observable<boolean> =
    this.store.select(isOwnerSelectedPlan);
  selectMembersSelectedPlan$: Observable<Member[]> = this.store.select(
    selectMembersSelectedPlan,
  );

  constructor(private readonly store: Store) {}

  loadPlansSuccess(plans: Plan[]): void {
    this.store.dispatch(PlanAction.loadPlansSuccess({ plans }));
  }

  loadCategoriesSuccess(categories: CategoryPlan[]): void {
    this.store.dispatch(PlanAction.loadCategoriesSuccess({ categories }));
  }

  selectPlan(plan: Plan): void {
    this.store.dispatch(PlanAction.selectPlan({ plan }));
  }

  createPlan(plan: CreatePlan): void {
    this.store.dispatch(PlanAction.createPlan({ plan }));
  }

  updatePlan(plan: UpdatePlan): void {
    this.store.dispatch(PlanAction.updatePlan({ plan }));
  }

  deletePlan(): void {
    this.store.dispatch(PlanAction.deletePlan());
  }
}

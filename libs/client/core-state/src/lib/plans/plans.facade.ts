import * as PlanAction from './plans.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Category,
  CreatePlan,
  Plan,
  UpdatePlan,
} from '@client/shared/interfaces';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import {
  selectAllPlans,
  selectCategories,
  selectSelectedPlan,
} from './plans.selector';

@Injectable({
  providedIn: 'root',
})
export class PlansFacade {
  plans$: Observable<Dictionary<Plan>> = this.store.select(selectAllPlans);
  categories$: Observable<Category[]> = this.store.select(selectCategories);
  selectedPlan$: Observable<Plan> = this.store.select(selectSelectedPlan);

  constructor(private readonly store: Store) {}

  loadPlansSuccess(plans: Plan[]): void {
    this.store.dispatch(PlanAction.loadPlansSuccess({ plans }));
  }

  loadCategoriesSuccess(categories: Category[]): void {
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

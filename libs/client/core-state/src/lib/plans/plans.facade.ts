import { loadPlans, loadPlansSuccess, selectPlan } from './plans.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Plan } from '@client/shared/interfaces';
import { Observable } from 'rxjs';
import { selectAllPlans, selectSelectedPlan } from './plans.reducer';

@Injectable({
  providedIn: 'root',
})
export class PlansFacade {
  plans$: Observable<Plan[]> = this.store.select(selectAllPlans);
  selectedPlan$: Observable<Plan | null> = this.store.select(selectSelectedPlan);

  constructor(private readonly store: Store) {}

  loadPlans(): void {
    this.store.dispatch(loadPlans());
  }

  loadPlansSuccess(plans: Plan[]): void {
    this.store.dispatch(loadPlansSuccess({ plans }));
  }

  selectPlan(plan: Plan): void {
    this.store.dispatch(selectPlan({ plan }));
  }
}

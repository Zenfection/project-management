import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { PlansFacade } from '@client/core-state';
import { Plan } from '@client/shared/interfaces';

@Injectable({ providedIn: 'root' })
export class PlanService {
  // Private
  private _plan: BehaviorSubject<Plan | null> = new BehaviorSubject(null);
  private _plans: BehaviorSubject<Plan[] | null> = new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private readonly plansFacade: PlansFacade
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for plans
   */
  get plans$(): Observable<Plan[]> {
    return this._plans.asObservable();
  }

  /**
   * Getter for plan
   */
  get plan$(): Observable<Plan> {
    return this._plan.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   //* Get plans
   */
  getPlans(): Observable<Plan[]> {
    return this._httpClient.get<Plan[]>('api/plans').pipe(
      tap((plans: Plan[]) => {
        this.plansFacade.loadPlansSuccess(plans);

        this._plans.next(plans);
      })
    );
  }

  /**
   //* Get plan by id
   */
  getPlanById(id: string): Observable<Plan> {
    return this._httpClient.get<Plan>(`api/plans/${id}`).pipe(
      map(plan => {
        this.plansFacade.selectPlan(plan);

        // Return the plan
        return plan;
      }),
      tap(plan => {
        this._plan.next(plan);
      }),
      switchMap(plan => {
        if (!plan) {
          return throwError(
            () => new Error('Could not found plan with id of ' + id + '!')
          );
        }

        return of(plan);
      })
    );
  }
}

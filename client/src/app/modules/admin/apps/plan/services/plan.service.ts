import { PlansFacade } from 'app/core/state/plans/plans.facade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from 'app/modules/admin/apps/plan/models/plan.types';
import { environment } from 'environments/environment.development';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlanService {
  // Private
  private _plan: BehaviorSubject<Plan | null> = new BehaviorSubject(null);
  private _plans: BehaviorSubject<Plan[] | null> = new BehaviorSubject(null);

  private s3BucketUrl: string = environment.s3_url;

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
    return this._httpClient
      .get<Plan[]>('api/plans', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken') ?? '',
        },
      })
      .pipe(
        tap((plans: Plan[]) => {
          plans.forEach((plan: any) => {
            plan.owner.info.avatar = `${this.s3BucketUrl}/${plan.owner.info.avatar}`;
            plan.members.forEach((member: any) => {
              member.info.avatar = `${this.s3BucketUrl}/${member.info.avatar}`;
            });
          });

          this.plansFacade.loadPlansSuccess(plans);

          this._plans.next(plans);
        })
      );
  }

  /**
   //* Get plan by id
   */
  getPlanById(id: string): Observable<Plan> {
    return this._httpClient
      .get<Plan>(`api/plans/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken') ?? '',
        },
      })
      .pipe(
        map(plan => {
          // Update the plan
          plan.owner.info.avatar = `${this.s3BucketUrl}/${plan.owner.info.avatar}`;
          plan.members.forEach((member: any) => {
            member.info.avatar = `${this.s3BucketUrl}/${member.info.avatar}`;
          });

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

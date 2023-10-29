import { members } from './../../../../mock-api/apps/scrumboard/data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Category,
  Plan,
  PlanTasks,
} from 'app/modules/admin/apps/plan/plan.types';
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
  private _categories: BehaviorSubject<Category[] | null> = new BehaviorSubject(
    null
  );
  private _plan: BehaviorSubject<Plan | null> = new BehaviorSubject(null);
  private _plans: BehaviorSubject<Plan[] | null> = new BehaviorSubject(null);
  private _planTasks: BehaviorSubject<PlanTasks[] | null> = new BehaviorSubject(
    null
  );
  private s3BucketUrl: string = environment.s3_url;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for categories
   */
  get categories$(): Observable<Category[]> {
    return this._categories.asObservable();
  }

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

  /**
   * Getter for planTasks
   */
  get planTasks$(): Observable<PlanTasks[]> {
    return this._planTasks.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   //* Get categories
   */
  getCategories(): Observable<Category[]> {
    return this._httpClient.get<Category[]>('api/plans/categories').pipe(
      tap((response: Category[]) => {
        this._categories.next(response);
      })
    );
  }

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
        tap((response: any) => {
          response.forEach((plan: any) => {
            plan.owner.info.avatar = `${this.s3BucketUrl}/${plan.owner.info.avatar}`;
            plan.members.forEach((member: any) => {
              member.info.avatar = `${this.s3BucketUrl}/${member.info.avatar}`;
            });
          });

          this._plans.next(response);
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

          this._plan.next(plan);

          // Return the plan
          return plan;
        }),
        switchMap(plan => {
          if (!plan) {
            return throwError('Could not found plan with id of ' + id + '!');
          }

          return of(plan);
        })
      );
  }

  /**
  //* Get plan tasks
 */
  getPlanTasks(id: string): Observable<PlanTasks[]> {
    return this._httpClient
      .get<PlanTasks[]>(`api/plans/${id}/tasks`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken') ?? '',
        },
      })
      .pipe(
        tap((response: PlanTasks[]) => {
          response.forEach((task: any) => {
            // task.ass.info.avatar = `${this.s3BucketUrl}/${task.assigneeTo.info.avatar}`;
            task.assignee.info.avatar = `${this.s3BucketUrl}/${task.assignee.info.avatar}`;
          });

          this._planTasks.next(response);
        })
      );
  }
}

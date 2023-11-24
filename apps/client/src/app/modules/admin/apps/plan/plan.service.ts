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
import { PlansFacade, TasksFacade } from '@client/core-state';
import { CategoryPlan, Member, Plan, Task } from '@client/shared/interfaces';

@Injectable({ providedIn: 'root' })
export class PlanService {
  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private readonly _plansFacade: PlansFacade,
    private readonly _tasksFacade: TasksFacade,
  ) {}

  private _members: BehaviorSubject<Member[] | null> = new BehaviorSubject(
    null,
  );

  get members$(): Observable<Member[]> {
    return this._members.asObservable();
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
        this._plansFacade.loadPlansSuccess(plans);
      }),
    );
  }

  /**
   //* Get Members
   */

  getMembers(): Observable<Member[]> {
    return this._httpClient.get<Member[]>('api/users/department').pipe(
      tap((members: Member[]) => {
        this._members.next(members);
      }),
    );
  }

  /**
   //* Get categories
   */
  getCategories(): Observable<CategoryPlan[]> {
    return this._httpClient.get<CategoryPlan[]>('api/plans/categories').pipe(
      tap((response: CategoryPlan[]) => {
        this._plansFacade.loadCategoriesSuccess(response);
      }),
    );
  }

  /**
   //* Get plan by id
   */
  getPlanById(id: string): Observable<Plan> {
    return this._httpClient.get<Plan>(`api/plans/${id}`).pipe(
      map((plan) => {
        // Return the plan
        return plan;
      }),
      tap((plan) => {
        this._plansFacade.selectPlan(plan);
      }),
      switchMap((plan) => {
        if (!plan) {
          return throwError(
            () => new Error('Could not found plan with id of ' + id + '!'),
          );
        }
        return of(plan);
      }),
    );
  }

  /**
  //* Get plan tasks
 */
  getPlanTasks(id: string): Observable<Task[]> {
    return this._httpClient.get<Task[]>(`api/plans/${id}/tasks`).pipe(
      tap((response: Task[]) => {
        this._tasksFacade.loadTasksSuccess(response);
      }),
    );
  }
}

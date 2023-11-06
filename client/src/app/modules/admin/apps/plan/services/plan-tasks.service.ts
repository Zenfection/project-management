import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { PlanTasks } from '../models/plan-tasks.types';

@Injectable({ providedIn: 'root' })
export class PlanTasksService {
  // Private
  private _planTasks: BehaviorSubject<PlanTasks[] | null> = new BehaviorSubject(
    null
  );
  private _planTask: BehaviorSubject<PlanTasks | null> = new BehaviorSubject(
    null
  );
  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for planTasks
   */
  get planTasks$(): Observable<PlanTasks[]> {
    return this._planTasks.asObservable();
  }

  /**
   * Getter for planTask
   */
  get planTask$(): Observable<PlanTasks> {
    return this._planTask.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
  //* Get plan tasks
 */
  getPlanTasks(id: string): Observable<PlanTasks[]> {
    return this._httpClient.get<PlanTasks[]>(`api/plans/${id}/tasks`).pipe(
      tap((response: PlanTasks[]) => {
        this._planTasks.next(response);
      })
    );
  }

  /**
    //* Get plan Task by Id
  */
  getPlanTaskById(taskId: string): Observable<PlanTasks> {
    return this._planTasks.pipe(
      switchMap(planTasks => {
        if (!planTasks) {
          return throwError(() => new Error('Plan tasks not found!'));
        }

        // Find the task
        const task = planTasks.find(item => item.id === Number(taskId));

        if (!task) {
          return throwError(
            () => new Error('Could not found task with id of ' + taskId + '!')
          );
        }

        return of(task);
      }),
      tap(task => {
        this._planTask.next(task);
      })
    );
  }
}

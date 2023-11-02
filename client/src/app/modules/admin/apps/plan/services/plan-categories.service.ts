import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Category } from '../models/category.types';

@Injectable({ providedIn: 'root' })
export class PlanCategoriesService {
  // Private
  private _categories: BehaviorSubject<Category[] | null> = new BehaviorSubject(
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
   * Getter for categories
   */
  get categories$(): Observable<Category[]> {
    return this._categories.asObservable();
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
}

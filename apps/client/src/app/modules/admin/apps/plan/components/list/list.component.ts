import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansFacade, UserFacade } from '@client/core-state';
import { CategoryPlan, Plan, User } from '@client/shared/interfaces';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  takeUntil,
} from 'rxjs';
import { PlanDialogsPlanComponent } from '../dialogs/plan/plan-dialog-plan.component';

@Component({
  selector: 'plan-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanListComponent implements OnInit, OnDestroy {
  categories$: Observable<CategoryPlan[]> = this._plansFacade.categories$;
  plans$: Observable<Plan[]> = this._plansFacade.plans$;
  user$: Observable<User> = this._userFacade.user$;
  filteredPlans: Plan[];

  filters: {
    categorySlug$: BehaviorSubject<string>;
    query$: BehaviorSubject<string>;
    hideCompleted$: BehaviorSubject<boolean>;
  } = {
    categorySlug$: new BehaviorSubject('all'),
    query$: new BehaviorSubject(''),
    hideCompleted$: new BehaviorSubject(false),
  };

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _matDialog: MatDialog,
    private readonly _plansFacade: PlansFacade,
    private readonly _userFacade: UserFacade,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Filter the plans
    combineLatest([
      this.filters.categorySlug$,
      this.filters.query$,
      this.filters.hideCompleted$,
    ]).subscribe(([categorySlug, query, hideCompleted]) => {
      this.plans$.subscribe((plans) => {
        this.filteredPlans = plans;
        this._changeDetectorRef.markForCheck();
      });

      // Filter by category
      if (categorySlug !== 'all') {
        this.filteredPlans = this.filteredPlans.filter(
          (plan) => plan.category['slug'] === categorySlug,
        );
      }

      // Filter by search query
      if (query !== '') {
        this.filteredPlans = this.filteredPlans.filter(
          (plan) =>
            plan.title.toLowerCase().includes(query.toLowerCase()) ||
            plan.description.toLowerCase().includes(query.toLowerCase()),
        );
      }

      // Filter by completed
      if (hideCompleted) {
        // this.filteredPlans = this.filteredPlans.filter(
        //   plan => plan.progress.completed === 0
        // );
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  get totalTasks(): Observable<number> {
    return this.plans$.pipe(
      takeUntil(this._unsubscribeAll),
      map((plans) => {
        return plans?.reduce((acc, plan) => {
          return acc + plan?._count?.tasks;
        }, 0);
      }),
    );
  }

  get overDueTask(): Observable<number> {
    return this.plans$.pipe(
      takeUntil(this._unsubscribeAll),
      map((plans) => {
        return plans?.reduce((acc, plan) => {
          return (
            acc +
            plan.tasks?.reduce((taskAcc, task) => {
              return taskAcc + (task.dueDate < new Date() ? 1 : 0);
            }, 0)
          );
        }, 0);
      }),
    );
  }

  TotalFile(tasks: Partial<Plan>): number {
    if (tasks && Array.isArray(tasks)) {
      return tasks?.reduce((taskAcc, task) => {
        return taskAcc + task._count.files;
      }, 0);
    }
    // Handle the case when tasks is undefined or not an array
    return 0;
  }

  deadLineDueTo(tasks: Partial<Plan>): Date {
    if (tasks && Array.isArray(tasks)) {
      return tasks?.reduce((taskAcc, task) => {
        return taskAcc > task.dueDate ? taskAcc : task.dueDate;
      }, new Date());
    }
    // Handle the case when tasks is undefined or not an array
    return new Date();
  }

  get permissionPlan(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => {
        const roles = user.roles.map((role) => role.name);
        return roles.some(
          (role) => role === 'TRUONG_KHOA' || role === 'THU_KY_KHOA',
        );
      }),
    );
  }

  ownerPlan(email: string) {
    return this.user$.pipe(
      map((user) => {
        return user.info.email === email;
      }),
    );
  }

  slideData(data: any, slice: number): any[] {
    return data.slice(0, slice);
  }

  addNewPlan(): void {
    this._matDialog.open(PlanDialogsPlanComponent, {
      autoFocus: false,
      data: {
        plan: {} as Plan,
      },
      disableClose: true,
    });
  }

  /**
   * Filter by search query
   *
   * @param query
   */
  filterByQuery(query: string): void {
    this.filters.query$.next(query);
  }

  /**
   * Filter by category
   *
   * @param change
   */
  filterByCategory(change: MatSelectChange): void {
    this.filters.categorySlug$.next(change.value);
  }

  /**
   * Show/hide completed plans
   *
   * @param change
   */
  toggleCompleted(change: MatSlideToggleChange): void {
    this.filters.hideCompleted$.next(change.checked);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}

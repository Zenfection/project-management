import { PlansFacade } from 'app/core/state/plans/plans.facade';
import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  AsyncPipe,
  I18nPluralPipe,
  JsonPipe,
  NgClass,
  NgFor,
  NgIf,
  PercentPipe,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { PlanService } from 'app/modules/admin/apps/plan/services/plan.service';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { RiveCanvas, RiveLinearAnimation } from 'ng-rive';
import { Category } from '../../models/category.types';
import { Plan } from '../../models/plan.types';
import { PlanCategoriesService } from '../../services/plan-categories.service';

@Component({
  selector: 'plan-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RiveCanvas,
    RiveLinearAnimation,
    CdkScrollable,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgFor,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    NgIf,
    JsonPipe,
    AsyncPipe,
    NgClass,
    MatTooltipModule,
    MatProgressBarModule,
    MatButtonModule,
    RouterLink,
    FuseFindByKeyPipe,
    PercentPipe,
    I18nPluralPipe,
    FuseCardComponent,
    TranslocoModule,
  ],
})
export class PlanListComponent implements OnInit, OnDestroy {
  categories: Category[];
  plans$: Observable<Plan[]> = this.plansFacade.plans$;

  user: User;
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
    private _planService: PlanService,
    private _planCategoriesService: PlanCategoriesService,
    private _userService: UserService,
    private readonly plansFacade: PlansFacade
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the categories
    this._planCategoriesService.categories$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((categories: Category[]) => {
        this.categories = categories;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the user
    this._userService.user$.subscribe(user => {
      this.user = user;
    });

    // Filter the plans
    combineLatest([
      this.filters.categorySlug$,
      this.filters.query$,
      this.filters.hideCompleted$,
    ]).subscribe(([categorySlug, query, hideCompleted]) => {
      // Reset the filtered plans
      this.plans$.subscribe(plans => {
        this.filteredPlans = plans;
      });

      // Filter by category
      if (categorySlug !== 'all') {
        this.filteredPlans = this.filteredPlans.filter(
          plan => plan.category['slug'] === categorySlug
        );
      }

      // Filter by search query
      if (query !== '') {
        this.filteredPlans = this.filteredPlans.filter(
          plan =>
            plan.title.toLowerCase().includes(query.toLowerCase()) ||
            plan.description.toLowerCase().includes(query.toLowerCase()) ||
            plan.category.toLowerCase().includes(query.toLowerCase())
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

  ownerPlan(email: string): boolean {
    return this.user.email === email;
  }

  slideData(data: any, slice: number): any[] {
    return data.slice(0, slice);
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

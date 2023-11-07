import { CdkScrollable } from '@angular/cdk/scrolling';
import { DOCUMENT, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Plan } from 'app/modules/admin/apps/plan/models/plan.types';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RiveCanvas, RiveLinearAnimation } from 'ng-rive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { User } from 'app/core/user/user.types';
import { Category } from '../../models/category.types';
import { PlanTasks } from '../../models/plan-tasks.types';
import { PlanTasksService } from '../../services/plan-tasks.service';
import { PlanCategoriesService } from '../../services/plan-categories.service';
import { PlansFacade } from 'app/core/state/plans/plans.facade';
import { UserFacade } from 'app/core/state/user/user.facade';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'plan-details',
  templateUrl: './details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterLink,
    MatIconModule,
    NgIf,
    NgClass,
    NgFor,
    MatButtonModule,
    MatProgressBarModule,
    MatMenuModule,
    MatTooltipModule,
    CdkScrollable,
    MatTabsModule,
    FuseFindByKeyPipe,
    FuseCardComponent,
    RiveCanvas,
    RiveLinearAnimation,
    TranslocoModule,
    RouterOutlet,
    LetDirective,
  ],
})
export class PlanDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

  categories: Category[];
  plan$: Observable<Plan> = this._plansFacade.selectedPlan$;
  user$: Observable<User> = this._userFacade.user$;

  user: User;
  planTasks: PlanTasks[];
  currentStep = 0;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened = true;
  allMembers: any[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _activatedRoute: ActivatedRoute,
    private _planTaskService: PlanTasksService,
    private _planCategoriesService: PlanCategoriesService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _router: Router,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _plansFacade: PlansFacade,
    private _userFacade: UserFacade
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
        // Get the categories
        this.categories = categories;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    this.plan$.subscribe(plan => {
      this.allMembers = [plan.owner, ...plan.members];
    });

    // Get the plan
    // this._planService.plan$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((plan: Plan) => {
    //     // Get the plan
    //     this.plan = plan;

    //     this.allMembers = [this.plan.owner, ...this.plan.members];

    //     // Go to step
    //     // this.goToStep(plan.progress.currentStep);

    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    //   });

    // Get Plan Tasks
    this._planTaskService.planTasks$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((planTasks: PlanTasks[]) => {
        this.planTasks = planTasks;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Set the drawerMode and drawerOpened
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        } else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
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
    // return this.user.email === email;
    return true;
  }

  percentCompleteTask(task: PlanTasks): number {
    const percent =
      (task.todos.filter(todo => todo.isDone).length / task.todos.length) * 100;
    return percent;
  }

  /**
   * On backdrop clicked
   */
  onBackdropClicked(): void {
    // Go back to the list
    this._router.navigate(['./'], { relativeTo: this._activatedRoute });

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Go to given step
   *
   * @param step
   */
  goToStep(step: number): void {
    // Set the current step
    this.currentStep = step;

    // Go to the step
    this.courseSteps.selectedIndex = this.currentStep;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Go to previous step
   */
  goToPreviousStep(): void {
    // Return if we already on the first step
    if (this.currentStep === 0) {
      return;
    }

    // Go to step
    this.goToStep(this.currentStep - 1);

    // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();
  }

  /**
   * Go to next step
   */
  goToNextStep(): void {
    // Return if we already on the last step
    // if (this.currentStep === this.plan.totalSteps - 1) {
    //   return;
    // }

    // Go to step
    this.goToStep(this.currentStep + 1);

    // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();
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

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Scrolls the current step element from
   * sidenav into the view. This only happens when
   * previous/next buttons pressed as we don't want
   * to change the scroll position of the sidebar
   * when the user actually clicks around the sidebar.
   *
   * @private
   */
  private _scrollCurrentStepElementIntoView(): void {
    // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
    setTimeout(() => {
      // Get the current step element and scroll it into view
      const currentStepElement =
        this._document.getElementsByClassName('current-step')[0];
      if (currentStepElement) {
        currentStepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }
}

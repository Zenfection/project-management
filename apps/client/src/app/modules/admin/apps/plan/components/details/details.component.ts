import { DOCUMENT } from '@angular/common';
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
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansFacade, UserFacade } from '@client/core-state';
import { CategoryPlan, Plan, User } from '@client/shared/interfaces';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Observable, Subject, combineLatest, map, takeUntil } from 'rxjs';

@Component({
  selector: 'plan-details',
  templateUrl: './details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailsComponent implements OnInit, OnDestroy {
  // @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

  categories$: Observable<CategoryPlan[]> = this._plansFacade.categories$;
  plan$: Observable<Plan> = this._plansFacade.selectedPlan$;
  user$: Observable<User> = this._userFacade.user$;

  user: User;

  // currentStep = 0;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _router: Router,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
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

  get permissionPlan(): Observable<boolean> {
    return combineLatest([this.user$, this.plan$]).pipe(
      map(([user, plan]) => {
        const roles = user.roles.map((role) => role.name);
        return (
          roles.includes('TRUONG_KHOA') ||
          roles.includes('THU_KY_KHOA') ||
          plan.owner.info.email === user.info.email
        );
      }),
    );
  }

  get ownerPlan(): Observable<boolean> {
    return combineLatest([this.user$, this.plan$]).pipe(
      map(([user, plan]) => {
        return plan.owner.info.email === user.info.email;
      }),
    );
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
  // goToStep(step: number): void {
  //   // Set the current step
  //   this.currentStep = step;

  //   // Go to the step
  //   this.courseSteps.selectedIndex = this.currentStep;

  //   // Mark for check
  //   this._changeDetectorRef.markForCheck();
  // }

  /**
   * Go to previous step
   */
  // goToPreviousStep(): void {
  //   // Return if we already on the first step
  //   if (this.currentStep === 0) {
  //     return;
  //   }

  //   // Go to step
  //   this.goToStep(this.currentStep - 1);

  //   // Scroll the current step selector from sidenav into view
  //   this._scrollCurrentStepElementIntoView();
  // }

  /**
   * Go to next step
   */
  // goToNextStep(): void {
  //   // Return if we already on the last step
  //   // if (this.currentStep === this.plan.totalSteps - 1) {
  //   //   return;
  //   // }

  //   // Go to step
  //   this.goToStep(this.currentStep + 1);

  //   // Scroll the current step selector from sidenav into view
  //   this._scrollCurrentStepElementIntoView();
  // }

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
  // private _scrollCurrentStepElementIntoView(): void {
  //   // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
  //   setTimeout(() => {
  //     // Get the current step element and scroll it into view
  //     const currentStepElement =
  //       this._document.getElementsByClassName('current-step')[0];
  //     if (currentStepElement) {
  //       currentStepElement.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start',
  //       });
  //     }
  //   });
  // }
}

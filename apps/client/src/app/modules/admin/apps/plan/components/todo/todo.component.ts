import { OverlayRef } from '@angular/cdk/overlay';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatDrawerToggleResult,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlansFacade, UserFacade } from '@client/core-state';
import { TranslocoModule } from '@ngneat/transloco';
import { PushPipe } from '@ngrx/component';
import {
  Observable,
  Subject,
  combineLatest,
  filter,
  map,
  takeUntil,
} from 'rxjs';
import { PlanDetailsComponent } from '../details/details.component';
import { PlanTodoNotFoundComponent } from './components/not-found/not-found.component';
import { PlanTodoModeViewComponent } from './mode/view/plan-todo-mode-view.component';

@Component({
  selector: 'plan-todo',
  templateUrl: './todo.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PlanTodoNotFoundComponent,
    PlanTodoModeViewComponent,
    RouterLink,
    MatIconModule,
    MatSidenavModule,
    NgIf,
    NgFor,
    NgClass,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    TranslocoModule,
    AsyncPipe,
    PushPipe,
  ],
})
export class PlanTodoComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private readonly _plansDetailsComponent: PlanDetailsComponent,
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private readonly _planFacade: PlansFacade,
    private readonly _userFafacde: UserFacade,
  ) {}

  editMode: boolean = false;

  private _tagsPanelOverlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    // init comment form

    // Open the drawer
    this._plansDetailsComponent.matDrawer.open();
  }

  /**
   * After view init
   */
  ngAfterViewInit(): void {
    // Listen for matDrawer opened change
    this._plansDetailsComponent.matDrawer.openedChange
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter((opened) => opened),
      )
      .subscribe(() => {
        // Focus on the title element
        // this._titleField.nativeElement.focus();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    // Dispose the overlay
    if (this._tagsPanelOverlayRef) {
      this._tagsPanelOverlayRef.dispose();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  //! @ Public methods
  // -----------------------------------------------------------------------------------------------------

  get permissionTodo(): Observable<boolean> {
    // chỉ trưởng khoa hoặc thư ký khoa, và chủ dự án này mới có quyền
    return combineLatest([
      this._userFafacde.user$,
      this._planFacade.selectedPlan$,
    ]).pipe(
      map(([user, plan]) => {
        const roles = user.roles.map((role) => role.name);
        return !(
          roles.includes('TRUONG_KHOA') ||
          roles.includes('THU_KY_KHOA') ||
          user.info.email === plan.owner.info.email
        );
      }),
    );
  }

  /**
   * Close the drawer
   */
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._plansDetailsComponent.matDrawer.close();
  }
}

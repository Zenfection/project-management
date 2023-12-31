import { OverlayRef } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { PlansFacade, TasksFacade, UserFacade } from '@client/core-state';
import { Member, Task } from '@client/shared/interfaces';
import {
  Observable,
  Subject,
  combineLatest,
  filter,
  map,
  takeUntil,
} from 'rxjs';
import { PlanDetailsComponent } from '../details/details.component';

@Component({
  selector: 'plan-todo',
  templateUrl: './todo.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTodoComponent implements OnInit, OnDestroy, AfterViewInit {
  task$: Observable<Task> = this._tasksFacade.selectedTask$;
  members$: Observable<Member[]> = this._plansFacade.selectMembersSelectedPlan$;

  constructor(
    private readonly _plansDetailsComponent: PlanDetailsComponent,
    private readonly _tasksFacade: TasksFacade,
    private readonly _plansFacade: PlansFacade,
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
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  get permissionTodo(): Observable<boolean> {
    return combineLatest([
      this._userFafacde.isAdmin$,
      this._tasksFacade.isOwnerSelectedTask$,
    ]).pipe(
      map(([isAdmin, isOwner]) => {
        return isAdmin || isOwner;
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

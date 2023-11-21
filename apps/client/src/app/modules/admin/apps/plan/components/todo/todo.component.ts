import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  filter,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import {
  MatDrawerToggleResult,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  AsyncPipe,
  NgClass,
  NgFor,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PlanDetailsComponent } from '../details/details.component';
import { FuseCardComponent } from '@fuse/components/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { PlansFacade, TasksFacade, UserFacade } from '@client/core-state';
import { LetDirective } from '@ngrx/component';
import { FormsModule } from '@angular/forms';
import { Task, Todo, UpdatePlan } from '@client/shared/interfaces';
import { clone, cloneDeep } from 'lodash-es';

@Component({
  selector: 'plan-todo',
  templateUrl: './todo.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatCheckboxModule,
    MatSidenavModule,
    NgIf,
    NgFor,
    NgTemplateOutlet,
    NgClass,
    FuseCardComponent,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatDividerModule,
    MatTooltipModule,
    MatProgressBarModule,
    TranslocoModule,
    AsyncPipe,
    LetDirective,
  ],
})
export class PlanTodoComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private readonly _plansDetailsComponent: PlanDetailsComponent,
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private readonly _planFacade: PlansFacade,
    private readonly _tasksFacade: TasksFacade,
    private readonly _userFafacde: UserFacade,
  ) {}

  task$: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
  taskChanged: Subject<Task> = new Subject<Task>();

  private _tagsPanelOverlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    // Open the drawer
    this._plansDetailsComponent.matDrawer.open();

    // Get task
    this._tasksFacade.selectedTask$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((task) => {
        this.task$.next(cloneDeep(task));
      });

    // subscribe to taskChanged
    this.taskChanged
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(500),
        switchMap((task) => {
          const dataUpdatePlan: UpdatePlan = {
            todos: {
              update: {
                where: {
                  id: task.id,
                },
                data: {
                  isDone: task.todos['isDone'],
                },
              },
            },
          };
          return of(dataUpdatePlan);
        }),
        tap((dataUpdatePlan) => {
          // this._planFacade.updatePlan(dataUpdatePlan);
          console.log(dataUpdatePlan);
        }),
      )
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
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
   * Progress Todo
   */
  get progressTodo(): Observable<number> {
    return this.task$.pipe(
      map((task) => {
        const percent =
          (task.todos.filter((todo) => todo.isDone).length /
            task.todos.length) *
          100;
        return percent;
      }),
    );
  }

  updateTodoOnTask(todo: Todo, task: Task) {
    if (task.id) {
      this.taskChanged.next(task);
    }

    // Trigger change detection
    this._changeDetectorRef.detectChanges();
  }

  /**
   * Close the drawer
   */
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._plansDetailsComponent.matDrawer.close();
  }
}

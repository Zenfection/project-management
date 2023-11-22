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
  debounce,
  debounceTime,
  filter,
  interval,
  map,
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
import { LetDirective, PushPipe } from '@ngrx/component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { Task, Todo, UpdateTask, User } from '@client/shared/interfaces';
import { cloneDeep } from 'lodash-es';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PlanTodoCommentComponent } from './components/comment/comment.component';

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
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    FuseCardComponent,
    TranslocoModule,
    AsyncPipe,
    LetDirective,
    PushPipe,
    PlanTodoCommentComponent,
  ],
})
export class PlanTodoComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private readonly _plansDetailsComponent: PlanDetailsComponent,
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private readonly _planFacade: PlansFacade,
    private readonly _tasksFacade: TasksFacade,
    private readonly _userFafacde: UserFacade,
  ) {}

  task$: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
  user$: Observable<User> = this._userFafacde.user$;
  taskChanged: Subject<Task> = new Subject<Task>();
  todoChanged: Subject<Todo> = new Subject<Todo>();

  disbaleTodo: boolean = false;

  private _tagsPanelOverlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    // init comment form

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
        tap((task) => {
          // this._tasksFacade.updateTask(task);
        }),
      )
      .subscribe();

    this.todoChanged
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounce(() => interval(300)),
        tap((todo) => {
          this._tasksFacade.updateTodo(todo);
        }),
      )
      .subscribe(() => {
        this.disbaleTodo = false;
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

  updateTodoOnTask(todo: Todo, task: Task, event: InputEvent) {
    // if event not typing content can this.todoChange.next
    this.todoChanged.next(todo);
    this.disbaleTodo = true;
    // check event focus input
    // if (event.type === 'focus') {
    // if (task.id) {
    // const index = task.todos.findIndex((t) => t.id === todo.id);
    // task.todos[index] = todo;
    // this.taskChanged.next(task);
    // this.disbaleTodo = true;
    // }
  }

  /**
   * Close the drawer
   */
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._plansDetailsComponent.matDrawer.close();
  }
}

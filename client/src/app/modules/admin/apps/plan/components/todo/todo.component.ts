import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, filter, takeUntil } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PlanTasks } from '../../models/plan-tasks.types';
import { PlanDetailsComponent } from '../details/details.component';
import { PlanTasksService } from '../../services/plan-tasks.service';

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
    NgIf,
    NgFor,
    NgTemplateOutlet,
    NgClass,
    MatTooltipModule,
    MatProgressBarModule,
    TranslocoModule,
  ],
})
export class PlanTodoComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private _plansDetailsComponent: PlanDetailsComponent,
    private _planTasksService: PlanTasksService,
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  task: PlanTasks;

  private _tagsPanelOverlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    // Open the drawer
    this._plansDetailsComponent.matDrawer.open();

    // Get the task
    this._planTasksService.planTask$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(task => {
        // Get the task
        this.task = task;

        // Mark for check
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
        filter(opened => opened)
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

  /**
   * Progress Todo
   */
  get progressTodo(): number {
    const percent =
      (this.task.todos.filter(todo => todo.isDone).length /
        this.task.todos.length) *
      100;
    return percent;
  }

  /**
   * Close the drawer
   */
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._plansDetailsComponent.matDrawer.close();
  }
}

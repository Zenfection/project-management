import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PlansFacade, TasksFacade } from '@client/core-state';
import { Plan, Task, UpdateTask } from '@client/shared/interfaces';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';
import { LetDirective, PushPipe } from '@ngrx/component';
import { TaskStatus } from '@prisma/client';
import { SortByPositionPipe } from '@tools';
import { cloneDeep } from 'lodash-es';
import { DateTime } from 'luxon';
import { Observable, Subject, map } from 'rxjs';
import { List } from '../scrumboard.models';
import { ScrumboardBoardAddCardComponent } from './add-card/add-card.component';

@Component({
  selector: 'scrumboard-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatIconModule,
    CdkScrollable,
    CdkDropList,
    CdkDropListGroup,
    NgFor,
    CdkDrag,
    CdkDragHandle,
    MatMenuModule,
    NgIf,
    NgClass,
    ScrumboardBoardAddCardComponent,
    RouterOutlet,
    DatePipe,
    LetDirective,
    PushPipe,
    AsyncPipe,
    SortByPositionPipe,
    TranslocoModule,
  ],
})
export class ScrumboardBoardComponent implements OnInit, OnDestroy {
  plan$: Observable<Plan> = this._plansFacade.selectedPlan$;
  tasks$: Observable<Task[]> = cloneDeep(this._tasksFacade.tasks$);

  lists: string[];

  // Private
  private readonly _positionStep: number = 65536;
  private readonly _maxListCount: number = 200;
  private readonly _maxPosition: number = this._positionStep * 500;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _fuseConfirmationService: FuseConfirmationService,
    private readonly _plansFacade: PlansFacade,
    private readonly _tasksFacade: TasksFacade,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // INIT LISTS
    this.lists = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'COMPLETED', 'CLOSED'];
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  totalTaskInList(list: any): Observable<number> {
    return this.tasks$.pipe(
      map((tasks) =>
        tasks.reduce((acc, task) => acc + (task.status === list ? 1 : 0), 0),
      ),
    );
  }

  tasksInList(list: any): Observable<Task[]> {
    return this.tasks$.pipe(
      map((tasks) =>
        tasks
          .filter((task) => task.status === list)
          .sort((a, b) => a.position - b.position),
      ),
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add new card
   */
  addCard(list: List, title: string): void {
    // Create a new card model
    // const card = new Card({
    //   boardId: this.board.id,
    //   listId: list.id,
    //   position: list.cards.length
    //     ? list.cards[list.cards.length - 1].position + this._positionStep
    //     : this._positionStep,
    //   title: title,
    // });
    // // Save the card
    // this._scrumboardService.createCard(card).subscribe();
  }

  /**
   * List dropped
   *
   * @param event
   */
  listDropped(event: CdkDragDrop<List[]>): void {
    // Move the item
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  /**
   * Card dropped
   *
   * @param event
   */
  taskDropped(event: CdkDragDrop<Task[]>): void {
    // Move or transfer the item
    if (event.previousContainer === event.container) {
      // Move the item
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      // Transfer the item
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      event.container.data[event.currentIndex].status = event.container
        .id as TaskStatus;
    }

    const updated = this._calculatePositions(event);

    const taskId = Number(event.container.data[event.currentIndex].id);
    this._tasksFacade.selectTask(taskId);

    const updateTask: UpdateTask = {
      status: event.container.id as TaskStatus,
      position: updated[0].position,
    };

    this._tasksFacade.updateTask(updateTask);
  }

  /**
   * Check if the given ISO_8601 date string is overdue
   *
   * @param date
   */
  isOverdue(date: string): boolean {
    return (
      DateTime.fromISO(date).startOf('day') < DateTime.now().startOf('day')
    );
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
   * Calculate and set item positions
   * from given CdkDragDrop event
   *
   * @param event
   * @private
   */
  private _calculatePositions(event: CdkDragDrop<any[]>): any[] {
    // Get the items
    let items = event.container.data;
    const currentItem = items[event.currentIndex];
    const prevItem = items[event.currentIndex - 1] || null;
    const nextItem = items[event.currentIndex + 1] || null;

    // If the item moved to the top...
    if (!prevItem) {
      // If the item moved to an empty container
      if (!nextItem) {
        currentItem.position = this._positionStep;
      } else {
        currentItem.position = nextItem.position / 2;
      }
    }
    // If the item moved to the bottom...
    else if (!nextItem) {
      currentItem.position = prevItem.position + this._positionStep;
    }
    // If the item moved in between other items...
    else {
      currentItem.position = (prevItem.position + nextItem.position) / 2;
    }

    // Check if all item positions need to be updated
    if (
      !Number.isInteger(currentItem.position) ||
      currentItem.position >= this._maxPosition
    ) {
      // Re-calculate all orders
      items = items.map((value, index) => {
        value.position = (index + 1) * this._positionStep;
        return value;
      });

      // Return items
      return items;
    }

    // Return currentItem
    return [currentItem];
  }
}

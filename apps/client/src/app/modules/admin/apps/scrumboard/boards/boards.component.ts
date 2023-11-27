import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PlansFacade } from '@client/core-state';
import { CoreUIModule } from '@client/core-ui';
import { Plan } from '@client/shared/interfaces';
import { TranslocoModule } from '@ngneat/transloco';
import { PushPipe } from '@ngrx/component';
import { TimeElapsedPipe } from '@tools';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'scrumboard-boards',
  templateUrl: './boards.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CdkScrollable,
    NgFor,
    RouterLink,
    MatIconModule,
    NgIf,
    CoreUIModule,
    TranslocoModule,
    TimeElapsedPipe,
    PushPipe,
  ],
})
export class ScrumboardBoardsComponent implements OnInit, OnDestroy {
  plans$: Observable<Plan[]> = this._plansFacade.plans$;

  // Private
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private readonly _plansFacade: PlansFacade) {}

  // @ Lifecycle hooks

  ngOnInit(): void {
    this.plans$.subscribe((plans) => {
      console.log('plans', plans);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // @ Public methods

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

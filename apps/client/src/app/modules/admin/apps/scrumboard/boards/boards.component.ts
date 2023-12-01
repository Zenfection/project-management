import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { PlansFacade } from '@client/core-state';
import { Plan } from '@client/shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'scrumboard-boards',
  templateUrl: './boards.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrumboardBoardsComponent {
  plans$: Observable<Plan[]> = this._plansFacade.plans$;

  constructor(private readonly _plansFacade: PlansFacade) {}

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

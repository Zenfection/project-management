import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Member } from '@client/shared/interfaces';

@Component({
  selector: 'plan-details-tabs-team',
  templateUrl: './plan-details-tabs-team.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailsTabsTeamComponent {
  @Input() members: Member[];
}

import { Component, Input } from '@angular/core';
import { Member } from '@client/shared/interfaces';

@Component({
  selector: 'plan-details-tabs-team',
  templateUrl: './plan-details-tabs-team.component.html',
})
export class PlanDetailsTabsTeamComponent {
  @Input() members: Member[];
}

import { Component, Input } from '@angular/core';
import { Plan } from '@client/shared/interfaces';

@Component({
  selector: 'plan-details-tabs-overview',
  templateUrl: './detail-tab-overview.component.html',
})
export class PlanDetailsTabsOverviewComponent {
  @Input() plan: Plan;
  constructor() {}
}

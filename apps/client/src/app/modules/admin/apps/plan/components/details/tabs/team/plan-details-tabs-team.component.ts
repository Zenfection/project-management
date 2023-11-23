import { Component, OnInit } from '@angular/core';
import { PlansFacade } from '@client/core-state';
import { Member } from '@client/shared/interfaces';

@Component({
  selector: 'plan-details-tabs-team',
  templateUrl: './plan-details-tabs-team.component.html',
})
export class PlanDetailsTabsTeamComponent implements OnInit {
  allMember: Member[];

  constructor(private readonly _planFacade: PlansFacade) {}

  ngOnInit() {
    this._planFacade.selectedPlan$.subscribe((plan) => {
      this.allMember = [
        plan.owner,
        ...plan.members.filter((member) => member.id !== plan.owner.id),
      ];
    });
  }
}

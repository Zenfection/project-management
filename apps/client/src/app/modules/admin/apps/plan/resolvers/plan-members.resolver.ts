import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PlanService } from '../plan.service';
import { Member } from '@client/shared/interfaces';

export const planMembersResolver: ResolveFn<Member[]> = (route, state) => {
  const planService = inject(PlanService);

  return planService.getMembers();
};

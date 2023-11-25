import { inject } from '@angular/core';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PlansService } from '../plans.service';

export const OwnsPlan = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const planService = inject(PlansService);
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    const planId = request.params.id; // Lấy plan id từ params

    return true;

    // // Lấy thông tin plan dựa trên plan id
    // const plan = planSe;

    // // So sánh id của chủ sở hữu plan với id của user
    // const isOwner = plan.ownerId === user.userId;

    // return isOwner;
  },
);

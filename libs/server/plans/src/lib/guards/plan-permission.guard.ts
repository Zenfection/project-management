import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ActiveUserData } from '@server/iam/feature/authentication/utils';
import { RoleEnum } from '@server/shared/entities';
import { PlansService } from '../plans.service';

@Injectable()
export class PlanPermissionGuard implements CanActivate {
  constructor(private readonly plansService: PlansService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user: ActiveUserData = request.user;
    const planId: number = Number(request.params.id);

    // Check if user special role
    if (
      user.roles.includes(RoleEnum.thu_ky_khoa) ||
      user.roles.includes(RoleEnum.truong_khoa)
    )
      return true;

    // Check if user member of plan or owner of plan
    if (!(await this.plansService.checkIsMember(user.sub, planId))) return true;
    if (!(await this.plansService.checkIsOwner(user.sub, planId))) return true;

    throw new UnauthorizedException("You don't have permission");
  }
}

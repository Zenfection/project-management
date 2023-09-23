import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleEntity } from 'src/users/entity/role.entity';
import { ActiveUserData } from 'src/iam/authentication/interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from '../../../constants/iam.contant';
import { ROLES_KEY } from '../../decorators/roles/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRole = this.reflector.getAllAndOverride<RoleEntity[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (contextRole) {
      const user: ActiveUserData = context.switchToHttp().getRequest()[
        REQUEST_USER_KEY
      ];

      return contextRole.some((role) => user.roles?.includes(role.name));
    }

    return true;
  }
}

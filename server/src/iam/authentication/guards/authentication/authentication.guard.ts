import { AccessTokenGuard } from './../access-token/access-token.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthType } from '../../enums/auth-type.enum';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from '../../decorators/auth/auth.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}
  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.None]: { canActivate: () => true },
    [AuthType.Bearer]: this.accessTokenGuard,
  };

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes
      .map((type: any) => this.authTypeGuardMap[type])
      .flat();

    const guardPromises = guards.map((guard: any) =>
      guard.canActivate(context),
    );

    const results = await Promise.allSettled(guardPromises); //? return 'rejected' or 'fulfilled'

    const rejected = results.find((result: any) => {
      return result.status === 'rejected';
    });

    if (rejected) {
      throw rejected['reason'];
    }

    return results.some(
      (result: any) => result.status === 'fulfilled' && result.value,
    );
  }
}

import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from '@server/shared/entities';
import passport from 'passport';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';

export class UserSerializer implements PassportSerializer {
  constructor() {
    const passportInstance = this.getPassportInstance();
    passportInstance.serializeUser((user, done) =>
      this.serializeUser(user as UserEntity, done),
    );
    passportInstance.deserializeUser((payload, done) =>
      this.deserializeUser(payload as ActiveUserData, done),
    );
  }

  getPassportInstance() {
    return passport;
  }

  serializeUser(
    user: UserEntity,
    done: (err: Error, user: ActiveUserData) => void,
  ) {
    // store user info authenticated in session
    done(null, {
      sub: user.id,
      email: user.email,
      // roles: user.roles as RoleEntity[],
      //   permissions: user.permissions as any,
    });
  }

  async deserializeUser(
    payload: ActiveUserData,
    done: (err: Error, payload: ActiveUserData) => void,
  ) {
    // retrieve user info authenticated from session
    done(null, payload);
  }
}

import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import passport from 'passport';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';

export class UserSerializer implements PassportSerializer {
  constructor() {
    const passportInstance = this.getPassportInstance();
    passportInstance.serializeUser((user, done) =>
      this.serializeUser(user as User, done),
    );
    passportInstance.deserializeUser((payload, done) =>
      this.deserializeUser(payload as ActiveUserData, done),
    );
  }

  getPassportInstance() {
    return passport;
  }

  serializeUser(user: User, done: (err: Error, user: ActiveUserData) => void) {
    // store user info authenticated in session
    done(null, {
      sub: user.id,
      email: user.email,
      //   role: user.role,
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

import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { User } from '@client/shared/interfaces';
import { Observable } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import { UserFacade } from '@client/core-state';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    NgIf,
    MatIconModule,
    NgClass,
    MatDividerModule,
    TranslocoModule,
    RouterModule,
    LetDirective,
  ],
})
export class UserComponent {
  static ngAcceptInputType_showAvatar: BooleanInput;

  @Input() showAvatar = true;
  user$: Observable<User> = this._userFacade.user$;

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private readonly _userFacade: UserFacade
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the user status
   *
   * @param status
   */
  updateUserStatus(status: string): void {
    // Return if user is not available
    if (!this.user$) {
      return;
    }

    // Update user status
    this._userFacade.updateUser({
      status,
    });
  }

  /**
   * Sign out
   */
  signOut(): void {
    this._router.navigate(['/sign-out']);
  }
}

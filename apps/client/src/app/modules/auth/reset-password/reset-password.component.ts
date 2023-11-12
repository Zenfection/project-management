import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@client/core/auth';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { finalize } from 'rxjs';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthResetPasswordComponent implements OnInit {
  @ViewChild('resetPasswordNgForm') resetPasswordNgForm?: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  resetPasswordForm?: UntypedFormGroup;
  showAlert = false;

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.resetPasswordForm = this._formBuilder.group(
      {
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: FuseValidators.mustMatch('password', 'passwordConfirm'),
      },
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reset password
   */
  resetPassword(): void {
    // Return if the form is invalid
    if (this.resetPasswordForm?.invalid) {
      return;
    }

    // Disable the form
    this.resetPasswordForm?.disable();

    // Hide the alert
    this.showAlert = false;

    // Send the request to the server
    this._authService
      .resetPassword(this.resetPasswordForm?.get('password')?.value)
      .pipe(
        finalize(() => {
          // Re-enable the form
          this.resetPasswordForm?.enable();

          // Reset the form
          this.resetPasswordNgForm?.resetForm();

          // Show the alert
          this.showAlert = true;
        }),
      )
      .subscribe(
        (response) => {
          // Set the alert
          this.alert = {
            type: 'success',
            message: 'Your password has been reset.',
          };
        },
        (response) => {
          // Set the alert
          this.alert = {
            type: 'error',
            message: 'Something went wrong, please try again.',
          };
        },
      );
  }
}

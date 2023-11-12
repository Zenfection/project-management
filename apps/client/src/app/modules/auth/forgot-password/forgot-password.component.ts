import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '@client/core/auth';
import { finalize } from 'rxjs';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthForgotPasswordComponent implements OnInit {
  @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm?: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  forgotPasswordForm?: UntypedFormGroup;
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
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Send the reset link
   */
  sendResetLink(): void {
    // Return if the form is invalid
    if (this.forgotPasswordForm?.invalid) {
      return;
    }

    // Disable the form
    this.forgotPasswordForm?.disable();

    // Hide the alert
    this.showAlert = false;

    // Forgot password
    this._authService
      .forgotPassword(this.forgotPasswordForm?.get('email')?.value)
      .pipe(
        finalize(() => {
          // Re-enable the form
          this.forgotPasswordForm?.enable();

          // Reset the form
          this.forgotPasswordNgForm?.resetForm();

          // Show the alert
          this.showAlert = true;
        }),
      )
      .subscribe(
        (response) => {
          // Set the alert
          this.alert = {
            type: 'success',
            message:
              "Password reset sent! You'll receive an email if you are registered on our system.",
          };
        },
        (response) => {
          // Set the alert
          this.alert = {
            type: 'error',
            message:
              'Email does not found! Are you sure you are already a member?',
          };
        },
      );
  }
}

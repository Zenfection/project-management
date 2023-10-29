import { messages } from './../../../../mock-api/apps/chat/data';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseCardComponent } from '@fuse/components/card';
import { TranslocoModule } from '@ngneat/transloco';
import { SettingsService } from 'app/core/setting/setting.service';
import { Setting } from 'app/core/setting/setting.types';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { SettingAccountValidator } from './account.validator';
import { FuseAlertService } from '@fuse/components/alert';
import { FuseAlertComponent } from '../../../../../@fuse/components/alert/alert.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'settings-account',
  templateUrl: './account.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    TextFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    NgFor,
    NgIf,
    FuseCardComponent,
    FuseAlertComponent,
  ],
})
export class SettingsAccountComponent implements OnInit {
  accountForm: UntypedFormGroup;
  user: User;
  setting: Setting;

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _userSerivce: UserService,
    private _settingService: SettingsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseAlertService: FuseAlertService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._userSerivce.user$.subscribe(user => {
      this.user = user;
    });

    this._settingService.setting$.subscribe(setting => {
      this.setting = setting;
    });

    // Create the form
    this.accountForm = this._formBuilder.group({
      name: [
        this.user.name,
        Validators.required,
        SettingAccountValidator.checkName,
      ],
      about: [this.user.about.replaceAll('-', '\n-'), Validators.required],
      email: [
        this.user.email,
        Validators.required,
        SettingAccountValidator.checkEmail,
      ],
      phone: [
        this.user.phone,
        Validators.required,
        SettingAccountValidator.checkPhoneNumberVN,
      ],
      address: [this.user.address, Validators.required],
      // language: [this.setting.language, Validators.required],
    });
  }

  get invalidName(): boolean {
    return (
      this.accountForm.get('name').hasError('invalidName') &&
      this.accountForm.get('name').touched &&
      !this.required('name') &&
      !this.minLength('name') &&
      !this.maxLength('name')
    );
  }

  get invalidEmail(): boolean {
    return (
      this.accountForm.get('email').hasError('invalidEmail') &&
      this.accountForm.get('email').touched &&
      !this.required('email')
    );
  }

  get invalidPhoneNumberVN(): boolean {
    return (
      this.accountForm.get('phone').hasError('invalidPhoneNumberVN') &&
      this.accountForm.get('phone').touched &&
      !this.required('phone')
    );
  }

  required(name: string): boolean {
    return this.accountForm.get(name).hasError('required');
  }

  minLength(name: string): boolean {
    return (
      this.accountForm.get(name).hasError('minlength') &&
      this.accountForm.get(name).dirty
    );
  }

  maxLength(name: string): boolean {
    return (
      this.accountForm.get(name).hasError('maxlength') &&
      this.accountForm.get(name).dirty
    );
  }

  updateAvatar($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    // url link

    this._userSerivce.updateAvatar(file).subscribe({
      next: () => {
        alert('Updated Avatar');
        // reload user
        this._changeDetectorRef.markForCheck();
      },
      error: err => {
        console.error(err.messages);
      },
    });
  }

  handleUpdate() {
    this._userSerivce
      .update({
        email: this.accountForm.get('email').value,
        name: this.accountForm.get('name').value,
        about: this.accountForm.get('about').value.replaceAll('\n', '-'),
        phone: this.accountForm.get('phone').value,
        address: this.accountForm.get('address').value,
      })
      .subscribe({
        next: () => {
          this._fuseAlertService.show('submit-success');
          setTimeout(() => {
            this._fuseAlertService.dismiss('submit-success');
          }, 3000);
        },

        error: err => {
          console.error(err.messages);
          this._fuseAlertService.show('submit-error');

          setTimeout(() => {
            this._fuseAlertService.dismiss('submit-error');
          }, 3000);
        },
      });
  }
}

import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import { SettingsService } from 'app/core/setting/setting.service';
import { Setting } from 'app/core/setting/setting.types';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [TranslocoModule,FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule, MatButtonModule],
})
export class SettingsAccountComponent implements OnInit
{
    accountForm: UntypedFormGroup;
    user: User;
    setting: Setting;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _userSerivce: UserService,
        private _settingService: SettingsService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._userSerivce.user$.subscribe((user) => {
          this.user = user
        });

        this._settingService.setting$.subscribe((setting) => {
          this.setting = setting
        });

        // Create the form
        this.accountForm = this._formBuilder.group({
            name    : [this.user.name, Validators.required],
            username: ['zenfection'],
            title   : ['Senior Frontend Developer'],
            company : ['CIT Can Tho Software'],
            about   : ['Hello My name is Zenfection, and I am a senior frontend developer with over 100 years of experience.'],
            email   : [this.user.email, Validators.email],
            phone   : ['0123-456-789'],
            country : ['usa'],
            language: [this.setting.language, Validators.required],
        });
    }
}

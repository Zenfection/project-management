import { NgModule } from '@angular/core';
import { NgClass, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SettingsAccountComponent } from './account/account.component';
import { SettingsNotificationsComponent } from './notifications/notifications.component';
import { SettingsPlanBillingComponent } from './plan-billing/plan-billing.component';
import { SettingsSecurityComponent } from './security/security.component';
import { SettingsTeamComponent } from './team/team.component';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { TranslocoModule, provideTranslocoScope } from '@ngneat/transloco';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    RouterModule.forChild(routes),
    TranslocoModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    NgFor,
    NgClass,
    NgSwitch,
    NgSwitchCase,
    SettingsAccountComponent,
    SettingsSecurityComponent,
    SettingsPlanBillingComponent,
    SettingsNotificationsComponent,
    SettingsTeamComponent,
  ],
  providers: [provideTranslocoScope('settings')],
  exports: [SettingsComponent],
})
export class SettingsModule {}

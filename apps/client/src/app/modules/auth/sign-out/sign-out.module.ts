import { I18nPluralPipe, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { AuthSignOutComponent } from './sign-out.component';

const routes = [
  {
    path: '',
    component: AuthSignOutComponent,
  },
] as Routes;

@NgModule({
  declarations: [AuthSignOutComponent],
  imports: [RouterModule.forChild(routes), NgIf, RouterLink, I18nPluralPipe],
  exports: [AuthSignOutComponent],
})
export class AuthSignOutModule {}

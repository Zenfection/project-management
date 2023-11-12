import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { AuthConfirmationRequiredComponent } from './confirmation-required.component';

const routes = [
  {
    path: '',
    component: AuthConfirmationRequiredComponent,
  },
] as Routes;

@NgModule({
  declarations: [AuthConfirmationRequiredComponent],
  imports: [RouterModule.forChild(routes), RouterLink],
  exports: [AuthConfirmationRequiredComponent],
})
export class AuthConfirmationRequiredModule {}

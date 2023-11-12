import { RouterModule, Routes } from '@angular/router';
import { AuthSignInComponent } from './sign-in.component';
import { NgModule } from '@angular/core';

const routes = [
  {
    path: '',
    component: AuthSignInComponent,
  },
] as Routes;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthSignInRoutingModule {}

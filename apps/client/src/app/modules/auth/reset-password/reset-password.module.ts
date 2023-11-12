import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { AuthResetPasswordComponent } from './reset-password.component';

const routes = [
  {
    path: '',
    component: AuthResetPasswordComponent,
  },
] as Routes;

@NgModule({
  declarations: [AuthResetPasswordComponent],
  imports: [
    RouterModule.forChild(routes),
    NgIf,
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  exports: [AuthResetPasswordComponent],
})
export class AuthResetPasswordModule {}

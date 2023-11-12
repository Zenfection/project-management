import { RouterLink, RouterModule, Routes } from '@angular/router';
import { AuthUnlockSessionComponent } from './unlock-session.component';
import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertComponent } from '@fuse/components/alert';

const routes = [
  {
    path: '',
    component: AuthUnlockSessionComponent,
  },
] as Routes;

@NgModule({
  declarations: [AuthUnlockSessionComponent],
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
  exports: [AuthUnlockSessionComponent],
})
export class AuthUnlockSessionModule {}

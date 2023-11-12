import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { AuthSignInComponent } from './sign-in.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RiveCanvas, RiveLinearAnimation } from 'ng-rive';
import { AuthSignInRoutingModule } from './sign-in-routing.module';

@NgModule({
  imports: [
    AuthSignInRoutingModule,
    RouterLink,
    FuseAlertComponent,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    RiveCanvas,
    RiveLinearAnimation,
  ],
  declarations: [AuthSignInComponent],
  exports: [AuthSignInComponent],
})
export class AuthSignInModule {}

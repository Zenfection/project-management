import { NgModule } from '@angular/core';
import { PlanListComponent } from './list.component';
import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  NgFor,
  NgIf,
  JsonPipe,
  AsyncPipe,
  NgClass,
  PercentPipe,
  I18nPluralPipe,
  DatePipe,
} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FuseCardComponent } from '@fuse';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { LetDirective } from '@ngrx/component';
import { RiveCanvas, RiveLinearAnimation } from 'ng-rive';

@NgModule({
  declarations: [PlanListComponent],
  imports: [
    RiveCanvas,
    RiveLinearAnimation,
    CdkScrollable,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgFor,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    NgIf,
    JsonPipe,
    AsyncPipe,
    NgClass,
    MatTooltipModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink,
    FuseFindByKeyPipe,
    PercentPipe,
    I18nPluralPipe,
    FuseCardComponent,
    TranslocoModule,
    LetDirective,
    DatePipe,
  ],
  providers: [],
  exports: [PlanListComponent],
})
export class PlanListModule {}

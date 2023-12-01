import { NgFor, NgIf, NgClass } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';
import { PlanExtrasLabelsComponent } from './labels/plan-extras-labels.component';

@NgModule({
  declarations: [PlanExtrasLabelsComponent],
  imports: [
    NgFor,
    NgIf,
    NgClass,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslocoModule,
  ],
  exports: [PlanExtrasLabelsComponent],
})
export class PlanExtrasModule {}

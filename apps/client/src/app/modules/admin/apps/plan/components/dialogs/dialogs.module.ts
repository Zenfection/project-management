import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import { PlanDialogsPlanComponent } from './plan/plan-dialog-plan.component';
import { PlanDialogsTaskComponent } from './task/plan-dialogs-task.component';
import { PlanExtrasModule } from '../extras/extras.module';

@NgModule({
  declarations: [PlanDialogsTaskComponent, PlanDialogsPlanComponent],
  imports: [
    PlanExtrasModule,
    MatDividerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatRippleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    TextFieldModule,
    TranslocoModule,
    NgIf,
    NgFor,
    NgClass,
    AsyncPipe,
    DatePipe,
  ],
  providers: [],
  exports: [PlanDialogsTaskComponent, PlanDialogsPlanComponent],
})
export class PlanDialogsModule {}

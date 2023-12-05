import { NgFor, NgIf, NgClass, AsyncPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';
import { PlanExtrasLabelsComponent } from './labels/plan-extras-labels.component';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { PlanExtrasAssignToComponent } from './assignto/plan-extras-assgin-to.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PlanExtrasDueDateComponent } from './duedate/plan-extras-duedate.component';

@NgModule({
  declarations: [
    PlanExtrasLabelsComponent,
    PlanExtrasAssignToComponent,
    PlanExtrasDueDateComponent,
  ],
  imports: [
    NgFor,
    NgIf,
    NgClass,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    TextFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    TranslocoModule,
    AsyncPipe,
    DatePipe,
  ],
  exports: [
    PlanExtrasLabelsComponent,
    PlanExtrasAssignToComponent,
    PlanExtrasDueDateComponent,
  ],
})
export class PlanExtrasModule {}

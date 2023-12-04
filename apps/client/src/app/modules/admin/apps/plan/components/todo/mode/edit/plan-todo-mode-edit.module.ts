import { NgModule } from '@angular/core';
import { PlanTodoModeEditComponent } from './plan-todo-mode-edit.component';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { PlanExtrasModule } from '../../../extras/extras.module';

@NgModule({
  imports: [
    PlanExtrasModule,
    NgIf,
    NgClass,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDatepickerModule,
    TranslocoModule,
  ],
  declarations: [PlanTodoModeEditComponent],
  exports: [PlanTodoModeEditComponent],
})
export class PlanTodoModeEditModule {}

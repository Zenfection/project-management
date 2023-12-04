import { NgModule } from '@angular/core';
import { PlanTodoListCheckComponent } from './list-check.component';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    NgIf,
    NgFor,
    MatCheckboxModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
  ],
  declarations: [PlanTodoListCheckComponent],
  exports: [PlanTodoListCheckComponent],
})
export class PlanTodoListCheckModule {}

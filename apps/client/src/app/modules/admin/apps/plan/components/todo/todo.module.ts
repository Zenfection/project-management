import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { PushPipe } from '@ngrx/component';
import { PlanExtrasModule } from '../extras/extras.module';
import { PlanTodoNotFoundComponent } from './components/not-found/not-found.component';
import { PlanTodoModeEditModule } from './mode/edit/plan-todo-mode-edit.module';
import { PlanTodoModeViewModule } from './mode/view/plan-todo.mode-view.module';
import { PlanTodoComponent } from './todo.component';

@NgModule({
  declarations: [PlanTodoComponent],
  imports: [
    PlanTodoNotFoundComponent,
    PlanTodoModeViewModule,
    PlanTodoModeEditModule,
    PlanExtrasModule,
    NgIf,
    NgClass,
    NgFor,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDatepickerModule,
    RouterLink,
    MatSidenavModule,
    NgIf,
    NgFor,
    NgClass,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    TranslocoModule,
    AsyncPipe,
    PushPipe,
  ],
  exports: [PlanTodoComponent],
})
export class PlanTodoModule {}

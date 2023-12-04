import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { PushPipe } from '@ngrx/component';
import { PlanTodoNotFoundComponent } from './components/not-found/not-found.component';
import { PlanTodoComponent } from './todo.component';
import { PlanTodoModeViewModule } from './mode/view/plan-todo.mode-view.module';
import { PlanTodoModeEditModule } from './mode/edit/plan-todo-mode-edit.module';

@NgModule({
  declarations: [PlanTodoComponent],
  imports: [
    PlanTodoNotFoundComponent,
    PlanTodoModeViewModule,
    PlanTodoModeEditModule,
    RouterLink,
    MatIconModule,
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

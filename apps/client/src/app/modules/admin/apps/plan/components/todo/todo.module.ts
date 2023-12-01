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
import { PlanTodoModeEditComponent } from './mode/edit/plan-todo-mode-edit.component';
import { PlanTodoModeViewComponent } from './mode/view/plan-todo-mode-view.component';
import { PlanTodoComponent } from './todo.component';

@NgModule({
  declarations: [PlanTodoComponent],
  imports: [
    PlanTodoNotFoundComponent,
    PlanTodoModeViewComponent,
    PlanTodoModeEditComponent,
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

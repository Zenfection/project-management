import { AsyncPipe, NgClass, NgFor, NgIf, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LetDirective, PushPipe } from '@ngrx/component';
import { PlanTodoListCheckModule } from '../../components/list-check/list-check.module';
import { PlanTodoNotFoundComponent } from '../../components/not-found/not-found.component';
import { PlanTodoModeViewComponent } from './plan-todo-mode-view.component';
import { PlanTodoCommentModule } from '../../components/comment/comment.module';
import { PlanTodoAttachFilesModule } from '../../components/attach-files/attach-files.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    PlanTodoNotFoundComponent,
    PlanTodoListCheckModule,
    PlanTodoAttachFilesModule,
    PlanTodoCommentModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
    NgClass,
    NgIf,
    NgFor,
    LetDirective,
    PushPipe,
    AsyncPipe,
    PercentPipe,
  ],
  declarations: [PlanTodoModeViewComponent],
  exports: [PlanTodoModeViewComponent],
})
export class PlanTodoModeViewModule {}

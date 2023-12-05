import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgFor,
  NgIf,
  PercentPipe,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardComponent } from '@fuse';
import { LetDirective, PushPipe } from '@ngrx/component';
import { TimeElapsedPipe } from '@tools';
import { QuillModule } from 'ngx-quill';
import { PlanTodoAttachFilesModule } from '../../components/attach-files/attach-files.module';
import { PlanTodoCommentComponent } from '../../components/comment/comment.component';
import { PlanTodoListCheckComponent } from '../../components/list-check/list-check.component';
import { PlanTodoNotFoundComponent } from '../../components/not-found/not-found.component';
import { PlanTodoModeViewComponent } from './plan-todo-mode-view.component';

@NgModule({
  imports: [
    QuillModule.forRoot(),
    MatFormFieldModule,
    ReactiveFormsModule,
    FuseCardComponent,
    TimeElapsedPipe,
    DatePipe,
    MatIconModule,
    PlanTodoNotFoundComponent,
    PlanTodoAttachFilesModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
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
  declarations: [
    PlanTodoModeViewComponent,
    PlanTodoListCheckComponent,
    PlanTodoCommentComponent,
  ],
  exports: [
    PlanTodoModeViewComponent,
    PlanTodoListCheckComponent,
    PlanTodoCommentComponent,
  ],
})
export class PlanTodoModeViewModule {}

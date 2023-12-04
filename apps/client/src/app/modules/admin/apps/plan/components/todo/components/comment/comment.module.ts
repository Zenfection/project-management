import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardComponent } from '@fuse';
import { PushPipe } from '@ngrx/component';
import { TimeElapsedPipe } from '@tools';
import { PlanTodoCommentComponent } from './comment.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    QuillModule,
    MatButtonModule,
    NgIf,
    NgFor,
    NgClass,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    FuseCardComponent,
    PushPipe,
    TimeElapsedPipe,
    DatePipe,
  ],
  declarations: [PlanTodoCommentComponent],
  exports: [PlanTodoCommentComponent],
})
export class PlanTodoCommentModule {}

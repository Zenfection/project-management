import {
  CdkDrag,
  CdkDragHandle,
  CdkDragPreview,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgFor,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslocoModule, provideTranslocoScope } from '@ngneat/transloco';
import { TasksListComponent } from './list/list.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { LetDirective, PushPipe } from '@ngrx/component';

@NgModule({
  imports: [
    TasksRoutingModule,
    MatSidenavModule,
    RouterOutlet,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    CdkDropList,
    NgFor,
    CdkDrag,
    NgClass,
    CdkDragPreview,
    CdkDragHandle,
    RouterLink,
    LetDirective,
    PushPipe,
    AsyncPipe,
    TitleCasePipe,
    DatePipe,
    TranslocoModule,
  ],
  providers: [provideTranslocoScope('tasks')],
  declarations: [TasksComponent, TasksListComponent],
  exports: [TasksComponent, TasksListComponent],
})
export class TasksModule {}

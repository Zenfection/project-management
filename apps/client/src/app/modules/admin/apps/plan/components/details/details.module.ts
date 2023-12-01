import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, NgClass, NgFor, NgIf, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FuseCardComponent } from '@fuse';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { LetDirective, PushPipe } from '@ngrx/component';
import { PlanDetailsComponent } from './details.component';
import { PlanDetailsTabsModule } from './tabs/plan-details-tabs.module';
import { PlanDetailsToolbarModule } from './toolbar/plan-details-toolbar.module';
import { PlanTodoModule } from '../todo/todo.module';

@NgModule({
  declarations: [PlanDetailsComponent],
  imports: [
    PlanDetailsToolbarModule,
    PlanDetailsTabsModule,
    PlanTodoModule,
    DragDropModule,
    MatSidenavModule,
    MatIconModule,
    NgIf,
    NgClass,
    NgFor,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    CdkScrollable,
    MatTabsModule,
    FuseFindByKeyPipe,
    FuseCardComponent,
    TranslocoModule,
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    LetDirective,
    PercentPipe,
    PushPipe,
  ],
  providers: [],
  exports: [PlanDetailsComponent],
})
export class PlanDetailsModule {}

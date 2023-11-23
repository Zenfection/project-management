import { NgModule } from '@angular/core';
import { PlanDetailsTabsOverviewComponent } from './overview/detail-tab-overview.component';
import { PlanDetailsTabsTeamComponent } from './team/plan-details-tabs-team.component';
import { NgFor, NgIf, NgClass, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardComponent } from '@fuse';
import { RiveModule } from 'ng-rive';
import { TranslocoModule } from '@ngneat/transloco';
import { PlanDetailsTabsTasksComponent } from './tasks/plan-details-tabs-tasks.component';
import { LetDirective } from '@ngrx/component';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    PlanDetailsTabsOverviewComponent,
    PlanDetailsTabsTeamComponent,
    PlanDetailsTabsTasksComponent,
  ],
  imports: [
    FuseCardComponent,
    RiveModule,
    MatIconModule,
    MatTooltipModule,
    NgFor,
    NgIf,
    NgClass,
    MatProgressBarModule,
    MatDialogModule,
    RouterLink,
    LetDirective,
    TranslocoModule,
    AsyncPipe,
  ],
  exports: [
    PlanDetailsTabsOverviewComponent,
    PlanDetailsTabsTeamComponent,
    PlanDetailsTabsTasksComponent,
  ],
  providers: [],
})
export class PlanDetailsTabsModule {}

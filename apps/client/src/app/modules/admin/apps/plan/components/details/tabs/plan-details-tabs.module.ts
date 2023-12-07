import { DragDropModule } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgClass, NgFor, NgIf, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CoreUIModule } from '@client/core-ui';
import { FuseCardComponent } from '@fuse';
import { TranslocoModule } from '@ngneat/transloco';
import { LetDirective } from '@ngrx/component';
import { SortByPositionPipe } from '@tools';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RiveModule } from 'ng-rive';
import { PlanDetailsTabsOverviewComponent } from './overview/plan-detail-tabs-overview.component';
import { PlanDetailsTabsTasksComponent } from './tasks/plan-details-tabs-tasks.component';
import { PlanDetailsTabsTeamComponent } from './team/plan-details-tabs-team.component';

@NgModule({
  declarations: [
    PlanDetailsTabsOverviewComponent,
    PlanDetailsTabsTeamComponent,
    PlanDetailsTabsTasksComponent,
  ],
  imports: [
    CoreUIModule,
    DragDropModule,
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
    PercentPipe,
    SortByPositionPipe,
    NgApexchartsModule,
  ],
  exports: [
    PlanDetailsTabsOverviewComponent,
    PlanDetailsTabsTeamComponent,
    PlanDetailsTabsTasksComponent,
  ],
  providers: [],
})
export class PlanDetailsTabsModule {}

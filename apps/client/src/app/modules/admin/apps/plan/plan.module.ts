import { NgModule } from '@angular/core';
import { provideTranslocoScope } from '@ngneat/transloco';
import { PlanDetailsModule } from './components/details/details.module';
import { PlanDialogsModule } from './components/dialogs/dialogs.module';
import { PlanExtrasModule } from './components/extras/extras.module';
import { PlanRoutingModule } from './plan-routing.module';
import { PlanComponent } from './plan.component';
import { PlanListModule } from './components/list/list.module';

@NgModule({
  imports: [
    PlanRoutingModule,
    PlanListModule,
    PlanDetailsModule,
    PlanDialogsModule,
    PlanExtrasModule,
  ],
  declarations: [PlanComponent],
  providers: [provideTranslocoScope('plan')],
  exports: [PlanComponent],
})
export class PlanModule {}

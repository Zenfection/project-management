import { PlanComponent } from './plan.component';
import { NgModule } from '@angular/core';
import { PlanRoutingModule } from './plan-routing.module';

@NgModule({
  imports: [PlanRoutingModule],
  declarations: [PlanComponent],
  exports: [PlanComponent],
})
export class PlanModule {}

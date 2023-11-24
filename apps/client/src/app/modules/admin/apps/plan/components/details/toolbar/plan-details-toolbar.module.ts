import { NgModule } from '@angular/core';
import { PlanDetailsToolbarComponent } from './plan-details-toolbar.component';
import { NgIf } from '@angular/common';
import { FuseCardComponent } from '@fuse';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PlanDetailsToolbarComponent],
  imports: [
    NgIf,
    FuseCardComponent,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [PlanDetailsToolbarComponent],
})
export class PlanDetailsToolbarModule {}

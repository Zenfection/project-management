import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProjectComponent } from './project.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ProjectService } from './project.service';

const routes = [
  {
    path: '',
    component: ProjectComponent,
    resolve: {
      data: () => inject(ProjectService).getData(),
    },
  },
] as Routes;

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslocoModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonToggleModule,
    NgApexchartsModule,
    NgFor,
    NgIf,
    MatTableModule,
    NgClass,
    CurrencyPipe,
    RouterModule,
  ],
  declarations: [ProjectComponent],
  exports: [ProjectComponent],
})
export class ProjectModule {}

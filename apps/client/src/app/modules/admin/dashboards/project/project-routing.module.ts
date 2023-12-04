import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectService } from './project.service';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    resolve: {
      data: () => inject(ProjectService).getData(),
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
  ],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}

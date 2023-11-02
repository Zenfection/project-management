import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { PlanComponent } from './plan.component';
import { PlanListComponent } from './components/list/list.component';
import { PlanDetailsComponent } from './components/details/details.component';
import { PlanTodoComponent } from './components/todo/todo.component';
import { TodoResolver } from './components/todo/todo.resolver';
import { TodoGuardCanDeactivate } from './components/todo/todo.guard';
import { planCategoriesResolver } from './resolvers/plan-categories.resolver';
import { planDetailsResolver } from './resolvers/plan-details.resolver';
import { planListResolver } from './resolvers/plan-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: PlanComponent,
    resolve: {
      categories: planCategoriesResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PlanListComponent,
        resolve: {
          plans: planListResolver,
        },
      },
      {
        path: ':id',
        component: PlanDetailsComponent,
        resolve: {
          course: planDetailsResolver,
        },
        children: [
          {
            path: ':taskId',
            component: PlanTodoComponent,
            resolve: {
              task: TodoResolver,
            },
            canDeactivate: [TodoGuardCanDeactivate],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
  ],
  exports: [RouterModule],
})
export class PlanRoutingModule {}

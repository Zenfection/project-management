import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { PlanDetailsComponent } from './components/details/details.component';
import { PlanListComponent } from './components/list/list.component';
import { TodoGuardCanDeactivate } from './components/todo/guards/todo.guard';
import { TodoResolver } from './components/todo/resolvers/todo.resolver';
import { PlanTodoComponent } from './components/todo/todo.component';
import { PlanComponent } from './plan.component';
import { planCategoriesResolver } from './resolvers/plan-categories.resolver';
import { planDetailsResolver } from './resolvers/plan-details.resolver';
import { planListResolver } from './resolvers/plan-list.resolver';
import { planMembersResolver } from './resolvers/plan-members.resolver';
import { planLabelsResolver } from './resolvers/plan-labels.resolver';

const routes: Routes = [
  {
    path: '',
    component: PlanComponent,
    resolve: {
      members: planMembersResolver,
      categories: planCategoriesResolver,
      labels: planLabelsResolver,
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
          task: planDetailsResolver,
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
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
  ],
  exports: [RouterModule],
})
export class PlanRoutingModule {}

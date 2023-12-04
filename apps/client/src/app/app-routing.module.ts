/* eslint-disable @nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { AuthGuard, NoAuthGuard } from '@client/core/auth';
import { LayoutComponent } from './layout/layout.component';
import { initialDataResolver } from './app.resolvers';
import { AdminAccessGuard } from '@client/core/auth';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'plan' },

  // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'dashboards',
  },

  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'confirmation-required',
        loadChildren: () =>
          import(
            './modules/auth/confirmation-required/confirmation-required.module'
          ).then((m) => m.AuthConfirmationRequiredModule),
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./modules/auth/forgot-password/forgot-password.module').then(
            (m) => m.AuthForgotPasswordModule,
          ),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('./modules/auth/reset-password/reset-password.module').then(
            (m) => m.AuthResetPasswordModule,
          ),
      },
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./modules/auth/sign-in/sign-in.module').then(
            (m) => m.AuthSignInModule,
          ),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./modules/auth/sign-up/sign-up.module').then(
            (m) => m.AuthSignUpModule,
          ),
      },
    ],
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () =>
          import('./modules/auth/sign-out/sign-out.module').then(
            (m) => m.AuthSignOutModule,
          ),
      },
      {
        path: 'unlock-session',
        loadChildren: () =>
          import('./modules/auth/unlock-session/unlock-session.module').then(
            (m) => m.AuthUnlockSessionModule,
          ),
      },
    ],
  },

  // Landing routes
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/landing/home/home.routes'),
      },
    ],
  },

  // Admin routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./modules/admin/dashboards/project/project.module').then(
            (m) => m.ProjectModule,
          ),
        canActivate: [AdminAccessGuard],
      },

      {
        path: 'plan',
        loadChildren: () =>
          import('./modules/admin/apps/plan/plan.module').then(
            (m) => m.PlanModule,
          ),
      },

      {
        path: 'scrumboard',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./modules/admin/apps/scrumboard/scrumboard.module').then(
                (m) => m.ScrumBoardModule,
              ),
          },
        ],
      },

      // {
      //   path: 'tasks',
      //   loadChildren: () =>
      //     import('./modules/admin/apps/tasks/tasks.module').then(
      //       (m) => m.TasksModule,
      //     ),
      // },

      {
        path: 'settings',
        loadChildren: () =>
          import('./modules/common/settings/settings.module').then(
            (m) => m.SettingsModule,
          ),
      },

      {
        path: 'contacts',
        loadChildren: () =>
          import('./modules/admin/apps/contacts/contacts.module').then(
            (m) => m.ContactsModule,
          ),
      },

      // 404 & Catch all
      {
        path: '404-not-found',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/common/errors/error-404/error-404.routes'),
      },
      { path: '**', redirectTo: '404-not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { initialDataResolver } from './app.resolvers';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';

const routes: Routes = [
  // Redirect empty path to '/example'
  {path: '', pathMatch : 'full', redirectTo: 'dashboards/project'},

  // Redirect signed-in user to the '/example'
  //
  // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboards/project'},

  // Auth routes for guests
  {
      path: '',
      canActivate: [NoAuthGuard],
      canActivateChild: [NoAuthGuard],
      component: LayoutComponent,
      data: {
          layout: 'empty'
      },
      children: [
          {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
          {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
          {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
          {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
          {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
      ]
  },

  // Auth routes for authenticated users
  {
      path: '',
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      component: LayoutComponent,
      data: {
          layout: 'empty'
      },
      children: [
          {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
          {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
      ]
  },

  // Landing routes
  {
      path: '',
      component: LayoutComponent,
      data: {
          layout: 'empty'
      },
      children: [
          {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
      ]
  },

  // Admin routes
  {
      path: '',
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      component: LayoutComponent,
      resolve: {
          initialData: initialDataResolver
      },
      children: [
        {
          path: 'dashboards', children: [
            { path: 'project', loadChildren: () => import('app/modules/admin/dashboards/project/project.routes') },
          ]
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
      provideRouter(routes,
        withPreloading(PreloadAllModules),
        withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
      ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

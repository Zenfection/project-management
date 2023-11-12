import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFuse } from '@fuse/index';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { mockApiServices } from './mock-api';
import { PlanModule } from './modules/admin/apps/plan/plan.module';
import { ProjectModule } from './modules/admin/dashboards/project/project.module';
import { CoreStateModule } from '@client/core-state';
import { provideAuth } from '@client/core/auth';
import { TranslocoRootModule } from './transloco-root.module';
import { provideIcons } from '@client/core/icons';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreStateModule,
    AppRoutingModule,
    ProjectModule,
    PlanModule,
    TranslocoRootModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
    },
    provideAnimations(),
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'D',
        },
        display: {
          dateInput: 'DDD',
          monthYearLabel: 'LLL yyyy',
          dateA11yLabel: 'DD',
          monthYearA11yLabel: 'LLLL yyyy',
        },
      },
    },

    provideIcons(),

    provideAuth(),
    provideFuse({
      mockApi: {
        delay: 0,
        services: mockApiServices,
      },
      fuse: {
        layout: 'modern',
        scheme: 'light',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px',
        },
        theme: 'theme-default',
        themes: [
          {
            id: 'theme-default',
            name: 'Default',
          },
          {
            id: 'theme-brand',
            name: 'Brand',
          },
          {
            id: 'theme-teal',
            name: 'Teal',
          },
          {
            id: 'theme-rose',
            name: 'Rose',
          },
          {
            id: 'theme-purple',
            name: 'Purple',
          },
          {
            id: 'theme-amber',
            name: 'Amber',
          },
        ],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

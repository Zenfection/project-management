import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { provideTransloco } from './core/transloco/transloco.provider';
import { provideAuth } from './core/auth/auth.provider';
import { provideIcons } from './core/icons/icons.provider';
import { provideFuse } from '@fuse';
import { mockApiServices } from './mock-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
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

    // Transloco Config
    provideTransloco(),

    // Fuse
    provideAuth(),
    provideIcons(),
    provideFuse({
        mockApi: {
            delay   : 0,
            services: mockApiServices,
        },
        fuse   : {
            layout : 'classy',
            scheme : 'light',
            screens: {
                sm: '600px',
                md: '960px',
                lg: '1280px',
                xl: '1440px',
            },
            theme  : 'theme-default',
            themes : [
                {
                    id  : 'theme-default',
                    name: 'Default',
                },
                {
                    id  : 'theme-brand',
                    name: 'Brand',
                },
                {
                    id  : 'theme-teal',
                    name: 'Teal',
                },
                {
                    id  : 'theme-rose',
                    name: 'Rose',
                },
                {
                    id  : 'theme-purple',
                    name: 'Purple',
                },
                {
                    id  : 'theme-amber',
                    name: 'Amber',
                },
            ],
        },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

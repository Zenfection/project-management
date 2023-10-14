import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
  TranslocoService
} from '@ngneat/transloco';
import { Injectable, NgModule, isDevMode } from '@angular/core';
import { inject } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
// import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private _httpClient: HttpClient) {}

  getTranslation(lang: string) {
    // return this.http.get<Translation>(`${environment.baseUrl}/assets/i18n/${lang}.json`);
    return this._httpClient.get<Translation>(`./assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'vi'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide   : APP_INITIALIZER,
      useFactory: () =>
      {
          const translocoService = inject(TranslocoService);
          const defaultLang = translocoService.getDefaultLang();
          translocoService.setActiveLang(defaultLang);

          return () => translocoService.load(defaultLang).toPromise();
      },
      multi     : true,
  },
  ]
})
export class TranslocoRootModule {}

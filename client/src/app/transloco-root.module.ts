import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
  TranslocoService,
} from '@ngneat/transloco';
import { Injectable, NgModule, isDevMode } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
// import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private readonly _httpClient: HttpClient) {}

  getTranslation(lang: string) {
    return this._httpClient.get<Translation>(`./assets/i18n/${lang}.json`);
  }
}

export function initializeApp(
  translocoService: TranslocoService
): () => Promise<any> {
  return (): Promise<any> => {
    const defaultLang = translocoService.getDefaultLang();
    translocoService.setActiveLang(defaultLang);
    return translocoService.load(defaultLang).toPromise();
  };
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: [
          {
            id: 'en',
            label: 'English',
          },
          {
            id: 'vi',
            label: 'Vietnamese',
          },
        ],
        defaultLang: 'en',
        fallbackLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslocoService],
      multi: true,
    },
  ],
})
export class TranslocoRootModule {}

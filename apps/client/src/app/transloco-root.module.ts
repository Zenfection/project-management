import { HttpClient } from '@angular/common/http';
import {
  Translation,
  TranslocoLoader,
  TranslocoModule,
  TranslocoService,
  provideTransloco,
} from '@ngneat/transloco';
import { Injectable, NgModule, isDevMode } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
// import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private readonly _httpClient: HttpClient) {
  }

  getTranslation(lang: string) {
    return this._httpClient.get<Translation>(`../assets/i18n/${lang}.json`);
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
    provideTransloco({
      config: {
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
        missingHandler: {
          useFallbackTranslation: false,
        },
      },
      loader: TranslocoHttpLoader,
    }),

    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslocoService],
      multi: true,
    },
  ],
})
export class TranslocoRootModule {}

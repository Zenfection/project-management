import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TranslocoHttpLoader implements TranslocoLoader
{
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get translation
     *
     * @param lang
     */
    getTranslation(lang: string): Observable<Translation>
    {
        return this._httpClient.get<Translation>(`./assets/i18n/${lang}.json`);
    }
}

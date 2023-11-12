import { NgClass, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import {
  FuseConfig,
  FuseConfigService,
  Scheme,
  Themes,
} from '@fuse/services/config';
import { SettingFacade } from '@client/core-state';

import { Observable, Subject, takeUntil } from 'rxjs';
import { Setting } from '@client/shared/interfaces';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styles: [
    `
      settings {
        position: static;
        display: block;
        flex: none;
        width: auto;
      }

      @media (screen and min-width: 1280px) {
        empty-layout + settings .settings-cog {
          right: 0 !important;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatIconModule,
    FuseDrawerComponent,
    MatButtonModule,
    NgFor,
    NgClass,
    MatTooltipModule,
  ],
})
export class SettingsComponent implements OnInit, OnDestroy {
  config: FuseConfig;
  layout: string;
  scheme: 'dark' | 'light' | 'auto';
  theme: string;
  themes: Themes;
  // setting: Setting;
  setting$: Observable<Setting> = this._settingFacade.setting$;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private _fuseConfigService: FuseConfigService,
    private _settingFacade: SettingFacade
  ) {}

  ngOnInit(): void {
    this._fuseConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: FuseConfig) => {
        // Store the config
        this.config = config;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the layout on the config
   *
   * @param layout
   */
  setLayout(layout: string): void {
    // Clear the 'layout' query param to allow layout changes
    this._router
      .navigate([], {
        queryParams: {
          layout: null,
        },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        if (!this.setting$) return;

        this._settingFacade.updateSetting({ layout });

        // Set the config
        this._fuseConfigService.config = { layout };
      });
  }

  /**
   * Set the scheme on the config
   *
   * @param scheme
   */
  setScheme(scheme: Scheme): void {
    if (!this.setting$) return;

    this._settingFacade.updateSetting({ scheme });

    this._fuseConfigService.config = { scheme: scheme as Scheme };
  }

  /**
   * Set the theme on the config
   *
   * @param theme
   */
  setTheme(theme: string): void {
    if (!this.setting$) return;

    this._fuseConfigService.config = { theme };

    theme = theme.replace('theme-', '');

    this._settingFacade.updateSetting({ theme });
  }
}

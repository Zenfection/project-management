import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class IconsService {
  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly matIconRegistry: MatIconRegistry
  ) {
    this.registerIconSets();
  }

  /**
   * Register icon sets
   */
  private registerIconSets(): void {
    const iconSets = [
      { namespace: '', path: 'assets/icons/material-twotone.svg' },
      { namespace: 'mat_outline', path: 'assets/icons/material-outline.svg' },
      { namespace: 'mat_solid', path: 'assets/icons/material-solid.svg' },
      { namespace: 'feather', path: 'assets/icons/feather.svg' },
      {
        namespace: 'heroicons_outline',
        path: 'assets/icons/heroicons-outline.svg',
      },
      {
        namespace: 'heroicons_solid',
        path: 'assets/icons/heroicons-solid.svg',
      },
      { namespace: 'heroicons_mini', path: 'assets/icons/heroicons-mini.svg' },
      { namespace: 'duotone', path: 'assets/icons/fontawesome/duotone.svg' },
      { namespace: 'brands', path: 'assets/icons/fontawesome/brands.svg' },
      { namespace: 'light', path: 'assets/icons/fontawesome/light.svg' },
      { namespace: 'regular', path: 'assets/icons/fontawesome/regular.svg' },
      { namespace: 'solid', path: 'assets/icons/fontawesome/solid.svg' },
      { namespace: 'thin', path: 'assets/icons/fontawesome/thin.svg' },
      {
        namespace: 'sharp-light',
        path: 'assets/icons/fontawesome/sharp-light.svg',
      },
      {
        namespace: 'sharp-regular',
        path: 'assets/icons/fontawesome/sharp-regular.svg',
      },
      {
        namespace: 'sharp-solid',
        path: 'assets/icons/fontawesome/sharp-solid.svg',
      },
    ];

    iconSets.forEach(iconSet => {
      this.matIconRegistry.addSvgIconSetInNamespace(
        iconSet.namespace,
        this.domSanitizer.bypassSecurityTrustResourceUrl(iconSet.path)
      );
    });
  }
}

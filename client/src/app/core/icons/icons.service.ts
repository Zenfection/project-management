import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({providedIn: 'root'})
export class IconsService
{
    /**
     * Constructor
     */
    constructor()
    {
        const domSanitizer = inject(DomSanitizer);
        const matIconRegistry = inject(MatIconRegistry);

        // Register icon sets
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-twotone.svg'));
        matIconRegistry.addSvgIconSetInNamespace('mat_outline', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-outline.svg'));
        matIconRegistry.addSvgIconSetInNamespace('mat_solid', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-solid.svg'));
        matIconRegistry.addSvgIconSetInNamespace('feather', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/feather.svg'));
        matIconRegistry.addSvgIconSetInNamespace('heroicons_outline', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-outline.svg'));
        matIconRegistry.addSvgIconSetInNamespace('heroicons_solid', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-solid.svg'));
        matIconRegistry.addSvgIconSetInNamespace('heroicons_mini', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-mini.svg'));


        //TODO Font Awesome Pro
        matIconRegistry.addSvgIconSetInNamespace('duotone', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/fontawesome/duotone.svg'));

        matIconRegistry.addSvgIconSetInNamespace('brands', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/fontawesome/brands.svg'));

        matIconRegistry.addSvgIconSetInNamespace('light', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/fontawesome/light.svg'));

        matIconRegistry.addSvgIconSetInNamespace('regular', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/fontawesome/regular.svg'));

        matIconRegistry.addSvgIconSetInNamespace('solid', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/fontawesome/solid.svg'));

        matIconRegistry.addSvgIconSetInNamespace('thin', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/fontawesome/thin.svg'));

        matIconRegistry.addSvgIconSetInNamespace('sharp-light', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/fontawesome/sharp-light.svg'));

        matIconRegistry.addSvgIconSetInNamespace('sharp-regular', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/fontawesome/sharp-regular.svg'));

        matIconRegistry.addSvgIconSetInNamespace('sharp-solid', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/fontawesome/sharp-solid.svg'));
    }
}

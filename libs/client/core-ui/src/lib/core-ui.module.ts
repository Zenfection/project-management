import { NgClass, NgFor, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarGroupComponent } from './avatar-group/avatar-group.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BradgeComponent } from './bradge/bradge.component';

@NgModule({
  declarations: [AvatarGroupComponent, BradgeComponent],
  imports: [NgFor, NgIf, NgClass, MatTooltipModule],
  providers: [],
  exports: [AvatarGroupComponent, BradgeComponent],
})
export class CoreUIModule {}

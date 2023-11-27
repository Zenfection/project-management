import { NgClass, NgFor, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarGroupComponent } from './avatar-group/avatar-group.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AvatarGroupComponent],
  imports: [NgFor, NgIf, NgClass, MatTooltipModule],
  providers: [],
  exports: [AvatarGroupComponent],
})
export class CoreUIModule {}

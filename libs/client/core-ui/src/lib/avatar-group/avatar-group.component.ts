import { Component, Input } from '@angular/core';
import { Member } from '@client/shared/interfaces';

@Component({
  selector: 'avatar-group',
  templateUrl: './avatar-group.component.html',
})
export class AvatarGroupComponent {
  @Input() size: number = 5;
  @Input() members: Member[];

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}

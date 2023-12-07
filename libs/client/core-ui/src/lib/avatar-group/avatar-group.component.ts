import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Member } from '@client/shared/interfaces';

@Component({
  selector: 'avatar-group',
  templateUrl: './avatar-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarGroupComponent {
  @Input() size: number = 5;
  @Input() members: Member[];

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'bradge',
  templateUrl: './bradge.component.html',
})
export class BradgeComponent {
  @Input() borderRadiusClass = 'rounded-full';
  @Input() textClass = 'rounded-full text-sm font-semibold';
  @Input() textColorClass: string = 'text-blue-500 dark:text-blue-100';
  @Input() colorClass: string = 'bg-blue-100 dark:bg-blue-500';
  @Input() paddingClass: string = 'px-3 py-0.5';
  @Input() content: string = 'Demo';
}

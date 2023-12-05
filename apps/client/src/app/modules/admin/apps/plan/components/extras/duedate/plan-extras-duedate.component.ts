import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'plan-extras-dueto',
  templateUrl: './plan-extras-duedate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlanExtrasDueDateComponent {
  @Input() dueDate: string;
  @Output() dueDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  dueDateFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return date >= new Date();
  };

  /**
   * Check if the given date is overdue
   */
  isOverdue(date: string): boolean {
    return (
      DateTime.fromISO(date).startOf('day') < DateTime.now().startOf('day')
    );
  }

  handleDueDateChange(event: Date): void {
    this.dueDateChange.emit(event);
  }
}

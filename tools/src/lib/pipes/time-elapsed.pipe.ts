import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'timeElapsed',
  standalone: true,
})
export class TimeElapsedPipe implements PipeTransform {
  transform(date: Date) {
    return DateTime.fromISO(date.toString()).toRelative();
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeElapsed',
  standalone: true,
})
export class TimeElapsedPipe implements PipeTransform {
  transform(value: Date) {
    // return date ago
    const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
    if (seconds < 29) {
      // less than 30 seconds ago will show as 'Just now'
      return 'Just now';
    }
    const intervals = {
      y: 31536000,
      m: 2592000,
      w: 604800,
      d: 86400,
      h: 3600,
      min: 60,
      sec: 1,
    };

    let counter;
    for (const i in intervals) {
      counter = Math.floor(seconds / intervals[i]);
      if (counter > 0) {
        if (counter === 1) {
          // singular (1 day ago)
          return counter + ' ' + i + ' ago';
        } else {
          // plural (2 days ago)
          return counter + ' ' + i + 's ago';
        }
      }
    }
    return value;
  }
}

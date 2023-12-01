import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByPosition',
  standalone: true,
})
export class SortByPositionPipe implements PipeTransform {
  transform(arr: any[]) {
    arr.sort((a, b) => {
      return a.position - b.position;
    });
    return arr;
  }
}

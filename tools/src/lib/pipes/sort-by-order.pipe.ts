import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByOrder',
  standalone: true,
})
export class SortByOrder implements PipeTransform {
  transform(arr: any[]) {
    arr.sort((a, b) => {
      return a.order - b.order;
    });
    return arr;
  }
}

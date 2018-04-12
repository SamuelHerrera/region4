import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ShortNumberPipe'
})
export class ShortNumberPipe implements PipeTransform {

  transform(number: any, args?: any): any {
    if (number === 0) {
      return 0;
    } else {
      // hundreds
      if (number <= 999) {
        return number;
      } else if (number >= 1000 && number <= 999999) {
        return +(number / 1000).toFixed(2) + 'K';
      } else if (number >= 1000000 && number <= 999999999) {
        return +(number / 1000000).toFixed(2) + 'M';
      } else if (number >= 1000000000 && number <= 999999999999) {
        return +(number / 1000000000).toFixed(2) + 'B';
      } else {
        return number;
      }
    }
  }

}

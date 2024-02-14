import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {

    console.log(value)
    
    return null;
  }

}

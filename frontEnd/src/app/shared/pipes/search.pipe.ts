import { Pipe, PipeTransform } from '@angular/core';
import { instructorInterface } from '../interface/common.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<instructorInterface>, args: string): instructorInterface[] | null {
    if (!value) return null
    if (!args) return value
    console.log(args)
    args = args.toLowerCase()

    return value.filter(item => {
      return JSON.stringify(item).toLowerCase().includes(args)
    })

  }

}

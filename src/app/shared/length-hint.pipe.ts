import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lengthHint'
})
export class LengthHintPipe implements PipeTransform {

  transform(value: string | any[], length: number): any {
    if (value) {
      return `${value.length} / ${length}`;
    }
    return `0 / ${length}`;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strength'
})
export class StrengthPipe implements PipeTransform {

  transform(value: number): string {
    return `${value} ${value < 10 ? '(weak)' : '(strong)'}`;
  }

}

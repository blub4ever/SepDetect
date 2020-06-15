import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'reverse'})

/**
 * Helper um in der UI Listen umgedreht anzuzeigen
 */
export class ReversePipe implements PipeTransform {
  transform(value) {
    // reverse
    return value.slice().reverse();
  }
}

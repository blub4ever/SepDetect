import {Directive, TemplateRef} from '@angular/core';

/**
 * ItemDirective für die CarouselItem
 */
@Directive({
  selector: '[carouselItem]'
})
export class CarouselItemDirective {
  constructor(public tpl: TemplateRef<any>) {
  }
}

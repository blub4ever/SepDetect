import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef, EventEmitter,
  Input,
  OnInit, Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style} from '@angular/animations';
import {CarouselItemDirective} from "@app/components/main/score-value-edit/carousel/carousel-item-directive";
import {CarouselItemElement} from "@app/components/main/score-value-edit/carousel-item-element";

@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {

  @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective>;

  @ViewChildren(CarouselItemElement, {read: ElementRef}) private itemsElements: QueryList<ElementRef>;

  @ViewChild('carousel') private carousel: ElementRef;

  @Input() timing = '250ms ease-in';

  private player: AnimationPlayer;

  private itemWidth: number;

  private currentSlide = 0;

  carouselWrapperStyle = {}

  get slideIndex() {
    return this.currentSlide;
  }

  set slideIndex(val) {
    this.currentSlide = val;
    this.slideIndexChange.emit(val);
  }

  @Output()
  slideIndexChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private builder: AnimationBuilder) {
  }

  ngAfterViewInit() {
    // For some reason only here I need to add setTimeout, in my local env it's working without this.
    setTimeout(() => {
      this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`
      }
    });

  }

  private buildAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({transform: `translateX(-${offset}px)`}))
    ]);
  }

  next(): boolean {
    if (this.currentSlide + 1 === this.items.length) return false;
    this.goToItem(this.currentSlide + 1)
    return true;
  }

  prev(): boolean {
    if (this.currentSlide === 0) return false;
    this.goToItem(this.currentSlide - 1)
    return true
  }

  goToItem(itemNumber: number) {
    this.slideIndex = itemNumber;
    const offset = itemNumber * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }


}

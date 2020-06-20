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
import {CarouselItemDirective} from '@app/components/main/score-value-edit/carousel/carousel-item-directive';
import {CarouselItemElement} from '@app/components/main/score-value-edit/carousel/carousel-item-element';

@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {

  @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective>;

  @ViewChildren(CarouselItemElement, {read: ElementRef}) private itemsElements: QueryList<ElementRef>;

  /**
   * Carousel ElementRef
   */
  @ViewChild('carousel') private carousel: ElementRef;

  /**
   * Slide Timing
   */
  @Input() timing = '250ms ease-in';

  /**
   * Animation Player
   */
  private player: AnimationPlayer;

  /**
   * Item Weite
   */
  private itemWidth: number;

  /**
   * Index des aktuellen Slides
   */
  private currentSlide = 0;

  /**
   * Style des wrappers
   */
  carouselWrapperStyle = {};

  /**
   * Event on Slide change
   */
  @Output()
  slideIndexChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Gibt den aktuellen Slide-Index zurück
   */
  get slideIndex() {
    return this.currentSlide;
  }

  /**
   * Setzt den aktuellen Slide-Index und feuert ein Change Event
   * @param val Slide-Index
   */
  set slideIndex(val) {
    this.currentSlide = val;
    this.slideIndexChange.emit(val);
  }

  constructor(private builder: AnimationBuilder) {
  }

  /**
   * AfterViewInit, setzt carousel Wrapper style
   */
  ngAfterViewInit() {
    // workaround, muss mit timeout gesetzt werden, da sonst die Änderung nicht übernommen werden
    setTimeout(() => {
      this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`
      };
    });

  }

  /**
   * Erstellt eine Animation zum sliden.
   * @param offset Offset in Pixeln
   */
  private buildAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({transform: `translateX(-${offset}px)`}))
    ]);
  }

  /**
   * Zeigt den nächsten Slide (wenn vorhanden)
   */
  next(): boolean {
    if (this.currentSlide + 1 === this.items.length) {
      return false;
    }
    this.goToItem(this.currentSlide + 1);
    return true;
  }

  /**
   * Zeigt den vorherigen Slide (wenn vorhanden)
   */
  prev(): boolean {
    if (this.currentSlide === 0) {
      return false;
    }
    this.goToItem(this.currentSlide - 1);
    return true;
  }

  /**
   * Geht zum Item
   * @param itemNumber Nummer des Items
   */
  goToItem(itemNumber: number) {
    this.slideIndex = itemNumber;
    // rechnet offset aus
    const offset = itemNumber * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }
}

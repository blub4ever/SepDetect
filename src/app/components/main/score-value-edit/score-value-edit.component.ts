import {
  AfterViewInit,
  Component,
  ContentChildren, ElementRef, EventEmitter,
  Input,
  OnInit, Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {Patient, ScoreValue} from '@app/model';
import {ActivatedRoute, Router} from "@angular/router";
import {PatientEditFormComponent} from "@app/components/subcomponents/patient-edit-form/patient-edit-form.component";
import {ScoreValueInputComponent} from "@app/components/subcomponents/score-value-input/score-value-input.component";
import {ScoreValueService} from "@app/services/rest/score-value.service";
import {MenuItem} from "primeng";
import {CarouselItemDirective} from "@app/components/main/score-value-edit/carousel/carousel-item-directive";
import {CarouselItemElement} from "@app/components/main/score-value-edit/carousel-item-element";
import {AnimationBuilder, AnimationFactory, AnimationPlayer} from "@angular/animations";
import {CarouselComponent} from "@app/components/main/score-value-edit/carousel/carousel.component";
import {element} from "protractor";
import {Subscription} from "rxjs";
import {AppNavigationService} from "@app/services";

@Component({
  selector: 'app-score-value-edit',
  templateUrl: './score-value-edit.component.html',
  styleUrls: ['./score-value-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScoreValueEditComponent implements OnInit, AfterViewInit {

  static INDEX_PAO = 0;
  static INDEX_GCS = 1;
  static INDEX_MAP = 2;
  static INDEX_LIVER = 3;
  static INDEX_COAGULATION = 4;
  static INDEX_KREA = 5;


  items: MenuItem[];

  activeIndex: number = 0;

  scoreValueId: number;

  patientId: number;

  scoreValue: ScoreValue;

  saveAble: boolean = false;

  @ViewChild('carouselComponent')
  private carousel: CarouselComponent;

  @ViewChildren("score_input")
  private scoreValues: QueryList<ScoreValueInputComponent>

  private carouselSlideIndexChangeRef: Subscription;

  private scoreValueChangedRef: Subscription[] = [];

  constructor(public nav: AppNavigationService,
              private builder: AnimationBuilder,
              private route: ActivatedRoute,
              private scoreValueService: ScoreValueService) {
  }

  ngOnInit(): void {
    this.scoreValueId = Number(this.route.snapshot.queryParamMap.get('scoreValueId'));
    this.patientId = Number(this.route.snapshot.queryParamMap.get('patientId'));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.items = [
        {label: '', styleClass: ''},
        {label: '', styleClass: ''},
        {label: '', styleClass: ''},
        {label: '', styleClass: ''},
        {label: '', styleClass: ''},
        {label: '', styleClass: ''}]

      if (this.scoreValueId != 0) {
        this.scoreValueService.getScoreValue(this.scoreValueId).subscribe(scoreValue => {
          this.scoreValue = scoreValue;
          const tmpArr = this.scoreValues.toArray()
          tmpArr[ScoreValueEditComponent.INDEX_PAO]._value = String(scoreValue.pao);
          tmpArr[ScoreValueEditComponent.INDEX_PAO].visited = true;
          tmpArr[ScoreValueEditComponent.INDEX_GCS]._value = String(scoreValue.gcs);
          tmpArr[ScoreValueEditComponent.INDEX_GCS].visited = true;
          tmpArr[ScoreValueEditComponent.INDEX_MAP]._value = String(scoreValue.map);
          tmpArr[ScoreValueEditComponent.INDEX_MAP].visited = true;
          tmpArr[ScoreValueEditComponent.INDEX_LIVER]._value = String(scoreValue.liver);
          tmpArr[ScoreValueEditComponent.INDEX_LIVER].visited = true;
          tmpArr[ScoreValueEditComponent.INDEX_COAGULATION]._value = String(scoreValue.coagulation);
          tmpArr[ScoreValueEditComponent.INDEX_COAGULATION].visited = true;
          tmpArr[ScoreValueEditComponent.INDEX_KREA]._value = String(scoreValue.krea);
          tmpArr[ScoreValueEditComponent.INDEX_KREA].visited = true;
          this.updateSteps();
        })
      } else {
        this.scoreValue = new ScoreValue()
        const today = new Date();
        const ye = new Intl.DateTimeFormat('de', {year: 'numeric'}).format(today)
        const mo = new Intl.DateTimeFormat('de', {month: '2-digit'}).format(today)
        const da = new Intl.DateTimeFormat('de', {day: '2-digit'}).format(today)
        this.scoreValue.id = 0
        this.scoreValue.date = `${ye}-${mo}-${da}`;

        this.scoreValues.first.visited = true;
        this.updateSteps();
      }

      this.carouselSlideIndexChangeRef = this.carousel.slideIndexChange.subscribe(index => {
        console.log("test" + index)
        this.updateIndexVisited(index)
        this.updateSteps();
      })

      this.scoreValues.forEach((element, index) => {
        this.scoreValueChangedRef.push(element.valueChangeEvent.subscribe(x => {
          if (!this.carousel.next()) {
            this.updateSteps();
          }
        }))
      })
    })
  }

  onActiveIndexChanged($event) {
    this.carousel.goToItem(this.activeIndex)
    console.log("active Index " + $event)
  }

  updateSteps() {
    let allValid = true;
    const scoreArray = this.scoreValues.toArray()
    this.items.forEach((element, index) => {
      allValid = this.updateStep(element, scoreArray[index]) && allValid;
    })
    this.saveAble = allValid;
  }

  updateStep(item: MenuItem, score: ScoreValueInputComponent): boolean {
    if (score.isValid() && score.visited) {
      item.styleClass = "completedStep";
      item.label = score.value
      return true;
    } else if (score.visited) {
      item.styleClass = "notCompletedStep";
      item.label = ""
      return false;
    } else {
      item.styleClass = "";
      item.label = ""
      return false;
    }
  }


  updateIndexVisited(index: number) {
    this.activeIndex = index;
    this.scoreValues.toArray()[index].visited = true;
  }

  createNewScoreValue() {
    const tmpArr = this.scoreValues.toArray()

    this.scoreValue.pao = Number(tmpArr[ScoreValueEditComponent.INDEX_PAO].value)
    this.scoreValue.gcs = Number(tmpArr[ScoreValueEditComponent.INDEX_GCS].value)
    this.scoreValue.map = Number(tmpArr[ScoreValueEditComponent.INDEX_MAP].value)
    this.scoreValue.liver = Number(tmpArr[ScoreValueEditComponent.INDEX_LIVER].value)
    this.scoreValue.coagulation = Number(tmpArr[ScoreValueEditComponent.INDEX_COAGULATION].value)
    this.scoreValue.krea = Number(tmpArr[ScoreValueEditComponent.INDEX_KREA].value)
    this.scoreValue.total = this.scoreValue.pao + this.scoreValue.gcs + this.scoreValue.map + this.scoreValue.liver + this.scoreValue.coagulation + this.scoreValue.krea

    if (this.scoreValueId == 0) {
      this.scoreValueService.createScoreValue(this.scoreValue, this.patientId).subscribe(scoreValue => {
        this.nav.goToPatientView(this.patientId);
      })
    } else {
      this.scoreValueService.editScoreValue(this.scoreValue).subscribe(scoreValue => {
        this.nav.goToPatientView(this.patientId);
      })
    }
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy() {
    this.carouselSlideIndexChangeRef.unsubscribe()
    this.scoreValueChangedRef.forEach((element, index) => {
      element.unsubscribe()
    })
  }

}

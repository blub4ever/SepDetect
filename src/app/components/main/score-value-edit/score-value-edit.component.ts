import {
  AfterViewInit,
  Component,
  ContentChildren, ElementRef, EventEmitter,
  Input, OnDestroy,
  OnInit, Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {Patient, ScoreValue} from '@app/model';
import {ActivatedRoute, Router} from '@angular/router';
import {ScoreValueInputComponent} from '@app/components/subcomponents/score-value-input/score-value-input.component';
import {ScoreValueService} from '@app/services/rest/score-value.service';
import {MenuItem} from 'primeng';
import {AnimationBuilder, AnimationFactory, AnimationPlayer} from '@angular/animations';
import {CarouselComponent} from '@app/components/main/score-value-edit/carousel/carousel.component';
import {Subscription} from 'rxjs';
import {AppNavigationService} from '@app/services';

/**
 * Komponente zum bearbeiten und erstellen von SOFA-Scores
 */
@Component({
  selector: 'app-score-value-edit',
  templateUrl: './score-value-edit.component.html',
  styleUrls: ['./score-value-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScoreValueEditComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Index POA
   */
  static INDEX_PAO = 0;
  /**
   * Index GCS
   */
  static INDEX_GCS = 1;
  /**
   * Index MAP
   */
  static INDEX_MAP = 2;
  /**
   * Index LIVER
   */
  static INDEX_LIVER = 3;
  /**
   * Index Coagulation
   */
  static INDEX_COAGULATION = 4;
  /**
   * Index Krea
   */
  static INDEX_KREA = 5;

  /**
   * MenuItems Array
   */
  items: MenuItem[];

  /**
   * Aktiver Index der items
   */
  activeIndex = 0;

  /**
   * Aktueller Patient
   */
  patient: Patient;

  /**
   * Aktueller SOFA-SCORE der bearbeitet werden soll
   */
  scoreValue: ScoreValue;

  /**
   * SOFA-SCORE kann gespeichert werden wenn true
   */
  saveAble = false;

  /**
   * Referenz zur Carousel-Komponente
   */
  @ViewChild('carouselComponent')
  private carousel: CarouselComponent;

  /**
   * Referenz zu den einzelnen Score Items des SOFA-Scores
   */
  @ViewChildren('score_input')
  private scoreValues: QueryList<ScoreValueInputComponent>;

  /**
   * Referenz zum Index change Event
   */
  private carouselSlideIndexChangeRef: Subscription;

  /**
   * Referenz zum ScoreValue change Event
   */
  private scoreValueChangedRef: Subscription[] = [];

  constructor(public nav: AppNavigationService,
              private builder: AnimationBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private scoreValueService: ScoreValueService) {
    // setzt den aktuellen Patienten und ScoreValue
    if (this.router.getCurrentNavigation().extras.state) {
      this.patient = this.router.getCurrentNavigation().extras.state.patient;
      this.scoreValue = this.router.getCurrentNavigation().extras.state.scoreValue;
    }
  }

  ngOnInit(): void {
  }

  /**
   * Wird nach der View-Anzeige ausgeführt
   */
  ngAfterViewInit(): void {
    // workaround
    setTimeout(() => {
      // item Array
      this.items = [
        {label: '', styleClass: ''},
        {label: '', styleClass: ''},
        {label: '', styleClass: ''},
        {label: '', styleClass: ''},
        {label: '', styleClass: ''},
        {label: '', styleClass: ''}];

      // wenn eine ScoreValue vorhanden wird, muss diese bearbeitet werden
      if (this.scoreValue) {
        this.scoreValueService.getScoreValue(this.scoreValue.id).subscribe(scoreValue => {
          this.scoreValue = scoreValue;
          const tmpArr = this.scoreValues.toArray();
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
        });
      } else {
        // wurde keine ScoreValue übergeben, wird eine neue erstellt
        this.scoreValue = new ScoreValue();
        const today = new Date();
        const ye = new Intl.DateTimeFormat('de', {year: 'numeric'}).format(today);
        const mo = new Intl.DateTimeFormat('de', {month: '2-digit'}).format(today);
        const da = new Intl.DateTimeFormat('de', {day: '2-digit'}).format(today);
        this.scoreValue.id = 0;
        this.scoreValue.date = `${ye}-${mo}-${da}`;

        this.scoreValues.first.visited = true;
        this.updateSteps();
      }

      // subscription für das Slide event
      this.carouselSlideIndexChangeRef = this.carousel.slideIndexChange.subscribe(index => {
        // updatet steps
        this.updateIndexVisited(index);
        this.updateSteps();
      });

      // subscription für jede ScoreValue
      this.scoreValues.forEach((element, index) => {
        this.scoreValueChangedRef.push(element.valueChangeEvent.subscribe(x => {
          if (!this.carousel.next()) {
            // updatet steps
            this.updateSteps();
          }
        }));
      });
    });
  }

  /**
   * Wird in der Progressbar das Item geändert, wird über diese Methode automatisch das Carousel rotiert
   * @param $event Event
   */
  onActiveIndexChanged($event) {
    this.carousel.goToItem(this.activeIndex);
  }

  /**
   * Wird ausgeführt, sobald eine Eingabe gemacht wurden. Ist für jede Eingabe ein richtiger Wert gewählt worden,
   * wird der Speicher-Knopf freigeschaltet.
   */
  updateSteps() {
    let allValid = true;
    const scoreArray = this.scoreValues.toArray();
    this.items.forEach((element, index) => {
      allValid = this.updateStep(element, scoreArray[index]) && allValid;
    });
    this.saveAble = allValid;
  }

  /**
   * Überprüft ob ein ScoreValueInputComponent gültig ist.
   * @param item MenuItem
   * @param score ScoreValueInputComponent
   */
  updateStep(item: MenuItem, score: ScoreValueInputComponent): boolean {
    if (score.isValid() && score.visited) {
      item.styleClass = 'completedStep';
      item.label = score.value;
      return true;
    } else if (score.visited) {
      item.styleClass = 'notCompletedStep';
      item.label = '';
      return false;
    } else {
      item.styleClass = '';
      item.label = '';
      return false;
    }
  }

  /**
   * Sets eine ScoreValue als bereits besucht.
   * @param index Index der ScoreValue
   */
  updateIndexVisited(index: number) {
    this.activeIndex = index;
    this.scoreValues.toArray()[index].visited = true;
  }

  /**
   * Kopiert die Werte aus den ScoreValueEditComponents in den aktuellen ScoreValue uns speichert diese.
   */
  createNewScoreValue() {
    const tmpArr = this.scoreValues.toArray();

    this.scoreValue.pao = Number(tmpArr[ScoreValueEditComponent.INDEX_PAO].value);
    this.scoreValue.gcs = Number(tmpArr[ScoreValueEditComponent.INDEX_GCS].value);
    this.scoreValue.map = Number(tmpArr[ScoreValueEditComponent.INDEX_MAP].value);
    this.scoreValue.liver = Number(tmpArr[ScoreValueEditComponent.INDEX_LIVER].value);
    this.scoreValue.coagulation = Number(tmpArr[ScoreValueEditComponent.INDEX_COAGULATION].value);
    this.scoreValue.krea = Number(tmpArr[ScoreValueEditComponent.INDEX_KREA].value);
    this.scoreValue.total = this.scoreValue.pao + this.scoreValue.gcs + this.scoreValue.map
      + this.scoreValue.liver + this.scoreValue.coagulation + this.scoreValue.krea;

    // erstellt oder bearbeitet eine ScoreValue
    if (!this.scoreValue.id) {
      this.scoreValueService.createScoreValue(this.scoreValue, this.patient.personId).subscribe(scoreValue => {
        this.nav.goToPatientView(this.patient.personId, {checkSofaHistory: true});
      });
    } else {
      this.scoreValueService.editScoreValue(this.scoreValue).subscribe(scoreValue => {
        this.nav.goToPatientView(this.patient.personId, {checkSofaHistory: true});
      });
    }
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy() {
    this.carouselSlideIndexChangeRef.unsubscribe();
    this.scoreValueChangedRef.forEach((element, index) => {
      element.unsubscribe();
    });
  }

}

import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ScoreValue} from '@app/model';

/**
 * Komponente für eine SOFA-SCore Value.
 */
@Component({
  selector: 'app-score-value-input',
  templateUrl: './score-value-input.component.html',
  styleUrls: ['./score-value-input.component.scss']
})
export class ScoreValueInputComponent implements OnInit {

  /**
   * Eventlistener, wird gefeuert, wenn sich ein Wert ändert
   */
  @Output() valueChangeEvent = new EventEmitter<string>();

  /**
   * Wert, 0-4, wenn -1 kein Wert
   */
  _value: string = '-1';

  /**
   * True wenn bereits besucht
   */
  visited: boolean = false;

  /**
   * Wert hat sich geändert, dann true
   */
  valueChange: boolean = false;

  /**
   * Setzt den aktuellen Wert und feuert ein change Event
   * @param va
   */
  set value(va) {
    this._value = va
    this.valueChange = true
    this.valueChangeEvent.emit(this.id)
  }

  /**
   * Gibt den aktuellen Wert zurück
   */
  get value() {
    return this._value
  }

  /**
   * Id des Items
   */
  @Input() id: string;
  /**
   * Titel
   */
  @Input() titel: string;
  /**
   * Text Option 1
   */
  @Input() option0: string;
  /**
   * Text Option 2
   */
  @Input() option1: string;
  /**
   * Text Option 3
   */
  @Input() option2: string;
  /**
   * Text Option 4
   */
  @Input() option3: string;
  /**
   * Text Option 5
   */
  @Input() option4: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Gibt True zurück wenn die Komponente einen gültigen Wert enthält
   */
  isValid(): boolean {
    const num = Number(this.value);
    return num >= 0 && num < 5
  }
}

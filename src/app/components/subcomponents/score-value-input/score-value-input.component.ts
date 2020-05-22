import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ScoreValue} from '@app/model';

@Component({
  selector: 'app-score-value-input',
  templateUrl: './score-value-input.component.html',
  styleUrls: ['./score-value-input.component.scss']
})
export class ScoreValueInputComponent implements OnInit {

  @Output() valueChangeEvent = new EventEmitter<string>();

  _value: string = '-1';

  visited: boolean = false;

  valueChange: boolean = false;

  set value(va) {
    this._value = va
    this.valueChange = true
    this.valueChangeEvent.emit(this.id)
  }

  get value() {
    return this._value
  }

  @Input() id: string;
  @Input() titel: string;
  @Input() option0: string;
  @Input() option1: string;
  @Input() option2: string;
  @Input() option3: string;
  @Input() option4: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  isValid(): boolean {
    const num = Number(this.value);
    return num >= 0 && num < 5
  }
}

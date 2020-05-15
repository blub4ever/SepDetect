import {Component, Input, OnInit} from '@angular/core';
import {ScoreValue} from '@app/model';

@Component({
  selector: 'app-score-value-input',
  templateUrl: './score-value-input.component.html',
  styleUrls: ['./score-value-input.component.scss']
})
export class ScoreValueInputComponent implements OnInit {

  value : string;

  @Input() titel: string;
  @Input() option0: string;
  @Input() option1: string;
  @Input() option2: string;
  @Input() option3: string;
  @Input() option4: string;

  constructor() { }

  ngOnInit(): void {
  }

}

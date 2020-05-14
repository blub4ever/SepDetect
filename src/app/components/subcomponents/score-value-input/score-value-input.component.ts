import {Component, Input, OnInit} from '@angular/core';
import {ScoreValue} from '@app/model';

@Component({
  selector: 'app-score-value-input',
  templateUrl: './score-value-input.component.html',
  styleUrls: ['./score-value-input.component.scss']
})
export class ScoreValueInputComponent implements OnInit {

  @Input() scoreValue: ScoreValue;

  value : string;

  constructor() { }

  ngOnInit(): void {
  }

}

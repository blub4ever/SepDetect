import {Component, Input, OnInit} from '@angular/core';
import {ScoreValue} from '@app/model';

@Component({
  selector: 'app-score-value',
  templateUrl: './score-value.component.html',
  styleUrls: ['./score-value.component.scss']
})
export class ScoreValueComponent implements OnInit {

  @Input() scoreValue: ScoreValue ;

  constructor() {
  }

  ngOnInit(): void {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {ScoreValue} from '@app/model';

@Component({
  selector: 'app-score-value-item',
  templateUrl: './score-value-item.component.html',
  styleUrls: ['./score-value-item.component.scss']
})
export class ScoreValueItemComponent implements OnInit {

  @Input() scoreValue: ScoreValue;

  constructor() { }

  ngOnInit(): void {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Patient, ScoreValue} from '@app/model';
import {Router} from "@angular/router";
import {AppNavigationService} from "@app/services";

@Component({
  selector: 'app-score-value-item',
  templateUrl: './score-value-item.component.html',
  styleUrls: ['./score-value-item.component.scss']
})
export class ScoreValueItemComponent implements OnInit {

  @Input() scoreValue: ScoreValue;
  @Input() patient: Patient;
  @Input() disabled: boolean;

  constructor(private router: Router,
              private nav: AppNavigationService
  ) {
  }

  ngOnInit()
    :
    void {
  }

  goToScoreEdit() {
    this.nav.goToEditScoreValue(this.patient, this.scoreValue)
  }
}

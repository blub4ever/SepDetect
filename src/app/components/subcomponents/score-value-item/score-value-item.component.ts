import {Component, Input, OnInit} from '@angular/core';
import {Patient, ScoreValue} from '@app/model';
import {Router} from "@angular/router";
import {AppNavigationService} from "@app/services";

/**
 * Kachel-Komponente für eine SOFA-Score-Vaue
 */
@Component({
  selector: 'app-score-value-item',
  templateUrl: './score-value-item.component.html',
  styleUrls: ['./score-value-item.component.scss']
})
export class ScoreValueItemComponent {

  /**
   * Sofa Score Value
   */
  @Input() scoreValue: ScoreValue;

  /**
   * Aktueller Patient
   */
  @Input() patient: Patient;

  /**
   * Aktiviert
   */
  @Input() disabled: boolean;

  constructor(private router: Router,
              private nav: AppNavigationService
  ) {
  }

  /**
   * Listener für onClick Events, ruft die edit Score Komponente auf
   */
  goToScoreEdit() {
    this.nav.goToEditScoreValue(this.patient, this.scoreValue)
  }
}

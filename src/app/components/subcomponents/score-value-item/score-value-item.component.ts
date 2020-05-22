import {Component, Input, OnInit} from '@angular/core';
import {Patient, ScoreValue} from '@app/model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-score-value-item',
  templateUrl: './score-value-item.component.html',
  styleUrls: ['./score-value-item.component.scss']
})
export class ScoreValueItemComponent implements OnInit {

  @Input() scoreValue: ScoreValue;
  @Input() patient: Patient;
  @Input() disabled: boolean;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToScoreEdit() {
    console.log(this.patient);
    this.router.navigate(['score'], {queryParams: {scoreValueId: this.scoreValue.id, patientId: this.patient.personId}})
  }
}

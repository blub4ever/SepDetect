import {Component, Input, OnInit} from '@angular/core';
import {Patient, ScoreValue} from '@app/model';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-score-value-edit',
  templateUrl: './score-value-edit.component.html',
  styleUrls: ['./score-value-edit.component.scss']
})
export class ScoreValueEditComponent implements OnInit {

  scoreValueId: number ;
  patientId: number;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.scoreValueId = Number(this.route.snapshot.queryParamMap.get('scoreValueId'));
    this.patientId = Number(this.route.snapshot.queryParamMap.get('patientId'));
  }

  goToPatient(){
    this.router.navigate(['/patient', this.patientId]);
  }

}

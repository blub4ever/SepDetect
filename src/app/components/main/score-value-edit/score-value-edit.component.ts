import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Patient, ScoreValue} from '@app/model';
import {ActivatedRoute, Router} from "@angular/router";
import {PatientEditFormComponent} from "@app/components/subcomponents/patient-edit-form/patient-edit-form.component";
import {ScoreValueInputComponent} from "@app/components/subcomponents/score-value-input/score-value-input.component";
import {ScoreValueService} from "@app/services/rest/score-value.service";

@Component({
  selector: 'app-score-value-edit',
  templateUrl: './score-value-edit.component.html',
  styleUrls: ['./score-value-edit.component.scss']
})
export class ScoreValueEditComponent implements OnInit {

  scoreValueId: number;

  patientId: number;

  scoreValue: ScoreValue;

  @ViewChild("poa_input")
  private poa: ScoreValueInputComponent

  @ViewChild("gcs_input")
  private gcs: ScoreValueInputComponent

  @ViewChild("map_input")
  private map: ScoreValueInputComponent

  @ViewChild("liver_input")
  private liver: ScoreValueInputComponent

  @ViewChild("coagulation_input")
  private coagulation: ScoreValueInputComponent

  @ViewChild("krea_input")
  private krea: ScoreValueInputComponent

  constructor(private router: Router,
              private route: ActivatedRoute,
              private scoreValueService: ScoreValueService) {
  }

  ngOnInit(): void {
    this.scoreValueId = Number(this.route.snapshot.queryParamMap.get('scoreValueId'));
    this.patientId = Number(this.route.snapshot.queryParamMap.get('patientId'));

    if (this.scoreValueId != 0) {
      this.scoreValueService.getScoreValue(this.scoreValueId).subscribe(scoreValue => {
        this.scoreValue = scoreValue;
        this.poa.value = String(scoreValue.poa);
        this.gcs.value = String(scoreValue.gcs);
        this.map.value = String(scoreValue.map);
        this.liver.value = String(scoreValue.liver);
        this.coagulation.value = String(scoreValue.coagulation);
        this.krea.value = String(scoreValue.krea);
      })
    } else {
      this.scoreValue = new ScoreValue()
      const today = new Date();
      const ye = new Intl.DateTimeFormat('de', {year: 'numeric'}).format(today)
      const mo = new Intl.DateTimeFormat('de', {month: '2-digit'}).format(today)
      const da = new Intl.DateTimeFormat('de', {day: '2-digit'}).format(today)
      this.scoreValue.id = 0
      this.scoreValue.date = `${ye}-${mo}-${da}`;
    }
  }

  goToPatient() {
    this.router.navigate(['/patient', this.patientId]);
  }

  createNewScoreValue() {
    this.scoreValue.poa = Number(this.poa.value)
    this.scoreValue.gcs = Number(this.gcs.value)
    this.scoreValue.map = Number(this.map.value)
    this.scoreValue.liver = Number(this.liver.value)
    this.scoreValue.coagulation = Number(this.coagulation.value)
    this.scoreValue.krea = Number(this.krea.value)
    this.scoreValue.total = this.scoreValue.poa + this.scoreValue.gcs + this.scoreValue.map + this.scoreValue.liver + this.scoreValue.coagulation + this.scoreValue.krea

    if(this.scoreValueId == 0) {
      this.scoreValueService.createScoreValue(this.scoreValue, this.patientId).subscribe(scoreValue => {
        this.goToPatient();
      })
    }else{
      this.scoreValueService.editScoreValue(this.scoreValue).subscribe(scoreValue => {
        this.goToPatient();
      })
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {Patient, Score} from '@app/model';
import {SelectItem} from 'primeng';
import {PatientService} from '@app/services/rest/patient.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patient: Patient;

  data: any;

  scores: SelectItem[];

  selectedScore: Score;

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private router: Router) {
    this.selectedScore = new Score();
  }

  ngOnInit(): void {
    console.log(Number(this.route.snapshot.paramMap.get('id')));
    this.patientService.getPatient(Number(this.route.snapshot.paramMap.get('id'))).subscribe(patient => {
      this.patient = patient;
      this.scores = [{label: 'Select Score', value: null}];

      for (const score of patient.scores) {
        this.scores.push({label: `Verlauf vom ${score.date}`, value: score});
      }

      if (patient.scores.length > 0) {
        const scores = patient.scores[patient.scores.length - 1];
        this.selectedScore = scores;

        var tlabels = [];
        var tdata = [];

        for (let v of scores.values) {
          tlabels.push(v.date);
          tdata.push(v.total);
        }

        this.data = {
          labels: tlabels,
          datasets: [
            {
              data: tdata,
              fill: true,
              label: 'Verlauf',
              borderColor: '#4bc0c0'
            }
          ]
        };
      } else {
        this.data = {
          labels: [],
          datasets: [
            {
              data: [],
              fill: true,
              label: 'Verlauf',
              borderColor: '#4bc0c0'
            }
          ]
        };
      }
    });
  }
}

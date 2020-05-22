import {Component, OnInit} from '@angular/core';
import {Patient, Score} from '@app/model';
import {MessageService, SelectItem} from 'primeng';
import {PatientService} from '@app/services/rest/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppNavigationService} from "@app/services/app-navigation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-patient',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {

  pageTitle: string = '';
  pageTitle2: string = '';

  patient: Patient;

  data: any;

  scores: SelectItem[];

  selectedScore: Score;

  reloadPatientRef: Subscription;

  options = {
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          console.log(tooltipItem)
          return tooltipItem.yLabel;
        }
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 24,
          fontColor: 'white'
        },
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white'
        },
      }]
    }

  }

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private messageService: MessageService,
              public nav: AppNavigationService) {
    this.selectedScore = new Score();
  }

  ngOnInit(): void {
    this.loadPatinet()
    this.reloadPatientRef = this.nav.reloadPatient.subscribe(x => {
      this.loadPatinet();
    })
  }

  loadPatinet() {
    console.log(Number(this.route.snapshot.paramMap.get('id')));
    this.patientService.getPatient(Number(this.route.snapshot.queryParamMap.get('patientId'))).subscribe(patient => {
        this.patient = patient;
        this.scores = [];

        this.pageTitle = `${patient.person.lastName}, ${patient.person.surname}`;
        this.pageTitle2 = `Geb. ${patient.person.birthday}`;

        for (const score of patient.scores) {
          this.scores.push({label: `Verlauf vom ${score.startDate} ${score.completed ? '(Archiv)' : ''}`, value: score});
        }

        if (patient.scores.length > 0) {
          const score = patient.scores[patient.scores.length - 1];
          this.selectedScore = score;

          const tlabels = new Array(score.values.length);
          const datatsets = [];
          var normalLine = true;
          var currentLine = undefined;

          if (score.values.length > 1) {
            for (let i = 0; i < score.values.length; i++) {
              if (i + 1 < score.values.length) {
                if (score.values[i].total + 2 <= score.values[i + 1].total) {
                  if (currentLine == undefined) {
                    currentLine = new Array(score.values.length);
                    normalLine = false;
                  }

                  if (normalLine) {
                    datatsets.push({
                      data: currentLine,
                      borderColor: '#4bc0c0'
                    })
                    currentLine = new Array(score.values.length);
                    normalLine = false;
                  }
                  currentLine[i] = score.values[i].total
                  currentLine[i + 1] = score.values[i + 1].total
                } else {

                  if (currentLine == undefined) {
                    currentLine = new Array(score.values.length);
                    normalLine = true;
                  }

                  if (!normalLine) {
                    datatsets.push({
                      data: currentLine,
                      borderColor: 'red'
                    })
                    currentLine = new Array(score.values.length);
                    normalLine = true;
                  }

                  currentLine[i] = score.values[i].total
                  currentLine[i + 1] = score.values[i + 1].total
                }
              }
              tlabels[i] = score.values[i].date
            }
            datatsets.push({
              data: currentLine,
              borderColor: (normalLine ? '#4bc0c0' : 'red')
            })
          } else {
            datatsets.push({
              data: [score.values[0].total],
              borderColor: (normalLine ? '#4bc0c0' : 'red')
            })
            tlabels[0] = score.values[0].date
          }

          this.data = {
            labels: tlabels,
            datasets: datatsets
          };
        } else {
          this.scores = [{label: 'Kein Verlauf vorhanden', value: null}];
          this.data = {
            labels: [],
            datasets: [
              {
                data: [],
                fill: true,
                label: 'Verlauf',
                borderColor: '#4bc0c0'
              }
            ],
          };
        }
      }
      ,
      error => {
        this.nav.goToPatients()
        this.messageService.add({
          severity: 'error',
          summary: 'Interner Fehler',
          detail: 'Fehler beim laden des Patienten!'
        });
      }
    );
  }

  ngOnDestroy() {
    this.reloadPatientRef.unsubscribe();
  }

}

import {Component, OnInit} from '@angular/core';
import {Patient, Score} from '@app/model';
import {ConfirmationService, MessageService, SelectItem} from 'primeng';
import {PatientService} from '@app/services/rest/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppNavigationService} from "@app/services/app-navigation.service";
import {Subscription} from "rxjs";
import {flatMap} from "rxjs/operators";

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

  selectedScore: Score = new Score();

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
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              public nav: AppNavigationService) {
    this.selectedScore
    if (this.router.getCurrentNavigation().extras.state) {
      this.patient = this.router.getCurrentNavigation().extras.state.patient;
      this.loadPatient()
    }
  }

  ngOnInit(): void {
    this.reloadPatientRef = this.nav.reloadPatient.subscribe(patient => {
      this.patient = patient;
      this.loadPatient();
    })

  }

  loadPatient() {
    this.scores = [];

    this.pageTitle = `${this.patient.person.lastName}, ${this.patient.person.surname}`;
    this.pageTitle2 = `Geb. ${this.patient.person.birthday}`;

    for (const score of this.patient.scores) {
      this.scores.push({label: `Verlauf vom ${score.startDate} ${score.completed ? '(Archiv)' : ''}`, value: score});
    }

    if (this.patient.scores.length > 0) {
      const score = this.patient.scores[this.patient.scores.length - 1];
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

        if (this.route.snapshot.queryParamMap.get("checkSofaHistory") && score.values.length > 1) {
          if (score.values[score.values.length - 1].total - score.values[score.values.length - 2].total >= 2) {
            this.confirmationService.confirm({
              header: 'SOFA-Score Anstieg!',
              defaultFocus: 'none',
              rejectVisible: false,
              acceptLabel: "Bestätigen",
              message: `Der SOFA-Score ist im Verlauf von ${score.values[score.values.length - 1].total} auf  ${score.values[score.values.length - 2].total} angestiegen!`,
            })
          }
        }

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


  ngOnDestroy() {
    this.reloadPatientRef.unsubscribe();
  }

}

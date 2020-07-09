import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Patient, Score} from '@app/model';
import {ConfirmationService, MessageService, SelectItem} from 'primeng';
import {PatientService} from '@app/services/rest/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppNavigationService} from "@app/services/app-navigation.service";
import {Subscription} from "rxjs";

/**
 * Komponente zeigt die Daten eines Patienten an
 */
@Component({
  selector: 'app-patient',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss'],
})
export class PatientViewComponent implements OnInit {

  /**
   * Page Titel, Patienten Name
   */
  pageTitle: string = '';

  /**
   * Page Subtitel, Geburtsdatum
   */
  pageTitle2: string = '';

  /**
   * Aktueller Patient
   */
  patient: Patient;

  /**
   * Daten für die Sofa-Score Verlaufsanzeige
   */
  data: any;

  /**
   * Alle Sofa-Scores
   */
  scores: SelectItem[];

  /**
   * Ausgewählter Sofa-Score
   */
  selectedScore: Score = new Score();

  /**
   * Subscription Ref, für unsubscribe
   */
  reloadPatientRef: Subscription;

  /**
   * True wenn eine Sofa-Score Warnung angezeigt wird
   */
  displayWarningDialog: boolean = false

  /**
   * Anzahl der SOFA-Score Steigerung
   */
  sofaScoreRise: number = 0;

  /**
   * Optionen für die Anzeige (chart.js) des Verlaufes
   */
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

  /**
   * Konstruktor, alle Parameter werden per auto-wire übergeben
   * @param route Route
   * @param patientService PatientenService
   * @param router Router
   * @param confirmationService ConfimationService
   * @param messageService MessageService
   * @param nav NavService
   */
  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              public nav: AppNavigationService) {
    // holt den aktuellen Patienten aus den Routing Data
    if (this.router.getCurrentNavigation().extras.state) {
      this.patient = this.router.getCurrentNavigation().extras.state.patient;
      this.loadPatient()
    }
  }

  /**
   * Subscription für das Patient Reload event, wird von Side-Bar gefeuert.
   */
  ngOnInit(): void {
    this.reloadPatientRef = this.nav.reloadPatient.subscribe(patient => {
      this.patient = patient;
      this.loadPatient();
    })
  }

  /**
   * Lädt den aktuellen Patienten, setzt den Seiten Titel, initialisiert alle Scores und zeichnet den Verlauf.
   */
  loadPatient() {
    this.scores = [];

    // Titel
    this.pageTitle = `${this.patient.person.lastName}, ${this.patient.person.surname}`;
    this.pageTitle2 = `Geb. ${this.patient.person.birthday}`;

    // Verläufe
    for (const score of this.patient.scores) {
      this.scores.push({label: `Verlauf vom ${score.startDate} ${score.completed ? '(Archiv)' : ''}`, value: score});
    }

    // sucht den ersten Verlauf aus
    if (this.patient.scores.length > 0) {
      const score = this.patient.scores[this.patient.scores.length - 1];
      this.selectedScore = score;
      this.drawScoreHistory(score)
    } else {
      this.drawScoreHistory(null)
    }
  }

  /**
   * Ziechnet die Score-History, Anstiege über 2 werden rot gezeichnet
   * @param score
   */
  drawScoreHistory(score: Score) {
    if (score && score.values.length > 0) {

      const tlabels = new Array(score.values.length);
      const datatsets = [];
      var normalLine = true;
      var currentLine = undefined;

      // zeichnet nur wenn zwei Werte vorhaden
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
            this.displayWarningDialog = true;
            this.sofaScoreRise = score.values[score.values.length - 1].total - score.values[score.values.length - 2].total
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

  /**
   * Redraw, wenn ein alter Score ausgewählt wird
   */
  onScoreChange() {
    this.drawScoreHistory(this.selectedScore)
  }

  /**
   * Schließt das Soca-Score Warning Popup
   */
  acceptWarning() {
    this.displayWarningDialog = false;
    this.sofaScoreRise = 0;
    this.nav.goToPatientView(this.patient.personId)
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy() {
    this.reloadPatientRef.unsubscribe();
  }

}

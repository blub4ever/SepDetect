import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScoreValueService} from "@app/services/rest/score-value.service";
import {PatientService} from "@app/services/rest/patient.service";
import {ConfirmationService, MessageService} from "primeng";
import {AppNavigationService} from "@app/services/app-navigation.service";
import {Patient} from "@app/model";
import {flatMap} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-patient-view-sidebar',
  templateUrl: './patient-view-sidebar.component.html',
  styleUrls: ['./patient-view-sidebar.component.scss']
})
export class PatientViewSidebarComponent implements OnInit {

  patient: Patient;

  reloadPatientRef: Subscription;

  constructor(
    public nav: AppNavigationService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private scoreValueService: ScoreValueService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.patient = this.router.getCurrentNavigation().extras.state.patient;
    }
  }

  ngOnInit(): void {
    this.reloadPatientRef = this.nav.reloadPatient.subscribe(patient => {
      this.patient = patient;
    })
  }

  endSofaHistory() {
    this.scoreValueService.endLastScore(this.patient.personId).pipe(
      flatMap(() => {
        return this.patientService.getPatient(this.patient.personId)
      })).subscribe(patient => {
      this.nav.reloadPatient.emit(patient);
      this.nav.showSidebar.emit(false);
      this.messageService.add({
        severity: 'success',
        summary: 'Verlauf abgeschlossen',
        detail: 'Der Verlauf wurde erfolgreich abgeschlossen!'
      });
    }, error => {
      this.nav.goToPatients();
      this.messageService.add({
        severity: 'error',
        summary: 'Interner Fehler',
        detail: 'Fehler beim abschließen des Verlaufes!'
      });
    })
  }

  inactivatePatient() {
    this.patientService.togglePatientActiveStatus(this.patient.personId, false).subscribe(x => {
      this.nav.goToPatients()
      this.messageService.add({
        severity: 'success',
        summary: 'Patient archiviert',
        detail: 'Der Patient wurde erfolgreich archiviert!'
      });
    }, error => {
      this.nav.showSidebar.emit(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Fehler',
        detail: 'Alle SOFA-Verläufe müssen abgeschlossen werden!'
      });
    })
  }

  deletePatient() {
    // schließe sidbar manuell, da sie sonst über dem Confirm-Dialog liegt.
    this.nav.showSidebar.emit(false);
    this.confirmationService.confirm({
      header: 'Patient löschen',
      defaultFocus: 'none',
      acceptLabel: "Löschen",
      rejectLabel: "Abbrechen",
      message: 'Soll der Patient wirklich gelöscht werden?',
      accept: () => {
        this.patientService.deletePatient(this.patient.personId).subscribe(x => {
          this.nav.goToPatients()
          this.messageService.add({
            severity: 'success',
            summary: 'Patient gelöscht',
            detail: 'Der Patient wurde erfolgreich gelöscht!'
          });
        }, error => {
          this.nav.goToPatients()
          this.messageService.add({
            severity: 'error',
            summary: 'Interner Fehler',
            detail: 'Fehler beim löschen des Patienten!'
          });
        })
      }
    });
  }

  isEndHistoryPossible(): boolean {
    if (!this.patient)
      return false;

    let result = false;
    for (const score of this.patient.scores) {
      if (!score.completed)
        result = true;
    }
    return result;
  }

  isPatientArchiveable(): boolean {
    let result = true;
    for (const score of this.patient.scores) {
      if (!score.completed)
        result = false;
    }
    return result;
  }

  ngOnDestroy() {
    this.reloadPatientRef.unsubscribe();
  }

}

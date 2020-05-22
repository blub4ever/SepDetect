import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScoreValueService} from "@app/services/rest/score-value.service";
import {PatientService} from "@app/services/rest/patient.service";
import {ConfirmationService, MessageService} from "primeng";
import {AppNavigationService} from "@app/services/app-navigation.service";

@Component({
  selector: 'app-patient-view-sidebar',
  templateUrl: './patient-view-sidebar.component.html',
  styleUrls: ['./patient-view-sidebar.component.scss']
})
export class PatientViewSidebarComponent implements OnInit {

  patientId: number;

  constructor(
    public nav: AppNavigationService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private scoreValueService: ScoreValueService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.queryParamMap.get('patientId'));
  }

  endSofaHistory() {
    this.scoreValueService.endLastScore(this.patientId).subscribe(x => {
      this.nav.reloadPatient.emit(true);
      this.nav.showSidebar.emit(false);
      this.messageService.add({
        severity: 'success',
        summary: 'Verlauf abgeschlossen',
        detail: 'Der Verlauf wurde erfolgreich abgeschlossen!'
      });
    }, error => {
      this.nav.reloadPatient.emit(true);
      this.nav.showSidebar.emit(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Interner Fehler',
        detail: 'Fehler beim abschließen des Verlaufes, Verlauf bereits abgeschlossen!'
      });
    })
  }

  inactivatePatient() {
    this.patientService.togglePatientActiveStatus(this.patientId, false).subscribe(x => {
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
        this.patientService.deletePatient(this.patientId).subscribe(x => {
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
}

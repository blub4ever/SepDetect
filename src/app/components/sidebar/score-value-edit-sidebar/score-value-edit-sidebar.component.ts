import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppNavigationService, AuthenticationService} from "@app/services";
import {ScoreValueService} from "@app/services/rest/score-value.service";
import {ConfirmationService, MessageService} from "primeng";
import {Patient, ScoreValue} from "@app/model";


/**
 * Navigationskomponente für die SOFA-Score Edit Ansicht
 */
@Component({
  selector: 'app-score-value-edit-sidebar',
  templateUrl: './score-value-edit-sidebar.component.html',
  styleUrls: ['./score-value-edit-sidebar.component.scss']
})
export class ScoreValueEditSidebarComponent implements OnInit {

  /**
   * aktueller Patient
   */
  patient: Patient;

  /**
   * Akteuller Sofa-Score
   */
  scoreValue: ScoreValue;

  constructor(public nav: AppNavigationService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private router: Router,
              private scoreValueService: ScoreValueService,
              private confirmationService: ConfirmationService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.patient = this.router.getCurrentNavigation().extras.state.patient;
      if (!this.scoreValue) {
        this.patient = this.router.getCurrentNavigation().extras.state.patient;
      } else {
        this.scoreValue = this.router.getCurrentNavigation().extras.state.scoreValue;
      }
    }
  }

  ngOnInit(): void {
  }

  /**
   * Löscht den aktuellen Sofa Score
   */
  deleteScoreValue() {
    // schließe sidbar manuell, da sie sonst über dem Confirm-Dialog liegt.
    this.nav.showSidebar.emit(false);
    this.confirmationService.confirm({
      header: 'SOFA-Eintrag löschen',
      defaultFocus: 'none',
      acceptLabel: "Löschen",
      rejectLabel: "Abbrechen",
      message: 'Soll der SOFA-Eintrag wirklich gelöscht werden?',
      accept: () => {
        this.scoreValueService.deleteScoreValue(this.scoreValue.id).subscribe(x => {
          this.nav.goToPatientView(this.patient.personId)
          this.messageService.add({
            severity: 'success',
            summary: 'SOFA-Eintrag gelöscht',
            detail: 'Der SOFA-Eintrag wurde erfolgreich gelöscht!'
          });
        }, error => {
          this.nav.goToPatients()
          this.messageService.add({
            severity: 'error',
            summary: 'Interner Fehler',
            detail: 'Fehler beim löschen des SOFA-Eintrags!'
          });
        })
      }
    });
  }

  /**
   * Gibt True zurück wenn der Sofa-Score gelöscht werden kann
   */
  isScoreDeleteable(): boolean {
    return !!this.scoreValue && !!this.scoreValue.id;
  }

}

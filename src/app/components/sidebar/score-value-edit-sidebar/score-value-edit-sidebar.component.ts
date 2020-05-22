import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppNavigationService, AuthenticationService} from "@app/services";
import {ScoreValueService} from "@app/services/rest/score-value.service";
import {ConfirmationService, MessageService} from "primeng";

@Component({
  selector: 'app-score-value-edit-sidebar',
  templateUrl: './score-value-edit-sidebar.component.html',
  styleUrls: ['./score-value-edit-sidebar.component.scss']
})
export class ScoreValueEditSidebarComponent implements OnInit {

  patientId: number;
  scoreValueId: number;

  constructor(public nav: AppNavigationService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private scoreValueService: ScoreValueService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.scoreValueId = Number(this.route.snapshot.queryParamMap.get('scoreValueId'));
    this.patientId = Number(this.route.snapshot.queryParamMap.get('patientId'));
  }

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
        this.scoreValueService.deleteScoreValue(this.scoreValueId).subscribe(x => {
          this.nav.goToPatientView(this.patientId)
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
}

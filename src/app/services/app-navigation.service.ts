import {EventEmitter, Injectable, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";
import {PatientService} from "@app/services/rest/patient.service";
import {MessageService} from "primeng";
import {flatMap} from "rxjs/operators";
import {Patient, ScoreValue} from "@app/model";

/**
 * Navigations-Objekt für die gerammte App. Ermöglicht es ein einfaches Navigieren von allen Komponenten, die dieses
 * Objekt verwenden.
 */
@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {

  /**
   * Konstruktor, Variablen werden per Autowire übergeben.
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private patientService: PatientService,
              private messageService: MessageService,
              private authenticationService: AuthenticationService) {
  }

  /**
   * Event-Listener für die Sidebar. Wenn true emitted wird, wird die Sidebar angezeigt.
   */
  @Output() showSidebar: EventEmitter<boolean> = new EventEmitter();

  /**
   * EventListener zum neu laden von Patienten.
   */
  @Output() reloadPatient: EventEmitter<Patient> = new EventEmitter();

  /**
   * Navigiert den Benutzer zur SOFA-SCORE Edit Komponente.
   * @param returnPatient Patient zu dem der SOFA-Score gehört und zu dem der Benutzer nach dem editieren eines SOFA-Scores
   * wieder zurück geführt werden soll.
   * @param scoreToEdit SOFA-Score der bearbeitet werden soll. Soll ein neuer Score erstellt werden muss hier ein neues
   * Objekt übergeben werden.
   */
  goToEditScoreValue(returnPatient: Patient, scoreToEdit: ScoreValue) {
    this.router.navigate(['score'], {
      state: {patient: returnPatient, scoreValue: scoreToEdit}
    });
  }

  /**
   * Navigiert zur Patienten bearbeiten Komponente.
   * @param patientId ID des Patienten der angezeigt werden soll.
   */
  goToEditPatient(patientId: number) {
    this.patientService.getPatient(patientId).subscribe(p => {
      this.router.navigate(['/patient/edit'], {state: {patient: p}});
    }, error => {
      // wenn ein Fehler auftritt wird die Patientenliste angezeigt
      this.goToPatients();
      this.messageService.add({
        severity: 'error',
        summary: 'Interner Fehler',
        detail: 'Fehler beim laden des Patienten!'
      });
    });
  }

  /**
   * Navigiert zur Eingabemaske für einen neuen Patienten.
   */
  goToNewPatient() {
    this.router.navigate(['/patient/edit']);
  }

  /**
   * Navigiert zur Such-Komponente.
   */
  goToSearchPatient() {
    this.router.navigate(['patient/search'], {queryParams: {searchMode: true}});
  }

  /**
   * Navigiert zur Patientenübersich.
   * @param patientId ID des Patienten
   * @param queryParams Bestimmte Parameter die der URL angehängt werden sollen. Z.B. {checkSofaHistory: true} (durch
   * diesen Parameter wird eine Überprüfung des SOFA-Score Anstieg ausgelöst.
   */
  goToPatientView(patientId: number, queryParams = {}) {
    this.patientService.getPatient(patientId).subscribe(p => {
      const extras = {state: {patient: p}, queryParams: queryParams};
      this.router.navigate(['/patient'], extras);
    }, error => {
      // wenn ein Fehler auftritt wird die Patientenliste angezeigt
      this.goToPatients();
      this.messageService.add({
        severity: 'error',
        summary: 'Interner Fehler',
        detail: 'Fehler beim laden des Patienten!'
      });
    });
  }

  /**
   * Navigiert zur Patientenliste
   */
  goToPatients() {
    this.router.navigate(['patients']);
  }

  /**
   * Navigiert zur About-Komponente
   */
  goToAbout() {
    this.router.navigate(['about']);
  }

  /**
   * Führt ein Logout durch und navigiert zur Login-Page.
   */
  logout() {
    this.authenticationService.logout();
  }
}

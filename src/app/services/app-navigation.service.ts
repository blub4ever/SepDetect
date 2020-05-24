import {EventEmitter, Injectable, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";
import {PatientService} from "@app/services/rest/patient.service";
import {MessageService} from "primeng";
import {flatMap} from "rxjs/operators";
import {Patient, ScoreValue} from "@app/model";

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private patientService: PatientService,
              private messageService: MessageService,
              private authenticationService: AuthenticationService) {
  }

  @Output() showSidebar: EventEmitter<boolean> = new EventEmitter();

  @Output() reloadPatient: EventEmitter<Patient> = new EventEmitter();

  goToEditScoreValue(returnPatient: Patient, scoreToEdit: ScoreValue) {
    // this.router.navigate(['score'], {queryParams: {scoreValueId: scoreValueId, patientId: returnPatientId}});
    this.router.navigate(['score'], {
      state: {patient: returnPatient, scoreValue: scoreToEdit}
    })
  }

  goToEditPatient(patientId: number) {
    this.patientService.getPatient(patientId).subscribe(p => {
      // this.router.navigate(['/patient/edit'], {queryParams: {patientId: patientId}})
      this.router.navigate(['/patient/edit'], {state: {patient: p}})
    }, error => {
      this.goToPatients()
      this.messageService.add({
        severity: 'error',
        summary: 'Interner Fehler',
        detail: 'Fehler beim laden des Patienten!'
      });
    })
  }

  goToNewPatient() {
    this.router.navigate(['/patient/edit'])
  }

  goToSearchPatient() {
    this.router.navigate(['patient/search'], {queryParams: {searchMode: true}});
  }

  goToPatientView(patientId: number, queryParams = {}) {
    this.patientService.getPatient(patientId).subscribe(p => {
      // this.router.navigate(['/patient/edit'], {queryParams: {patientId: patientId}})
      const extras = {state: {patient: p}, queryParams: queryParams};
      this.router.navigate(['/patient'],extras)
    }, error => {
      this.goToPatients()
      this.messageService.add({
        severity: 'error',
        summary: 'Interner Fehler',
        detail: 'Fehler beim laden des Patienten!'
      });
    })
  }

  goToPatients() {
    this.router.navigate(['patients']);
  }

  goToAbout() {
    this.router.navigate(['about']);
  }

  logout() {
    this.authenticationService.logout();
  }
}

import {EventEmitter, Injectable, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";
import {PatientService} from "@app/services/rest/patient.service";
import {MessageService} from "primeng";

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

  @Output() reloadPatient: EventEmitter<boolean> = new EventEmitter();

  goToEditScoreValue(scoreValueId: number, returnPatientId: number) {
    this.router.navigate(['score'], {queryParams: {scoreValueId: scoreValueId, patientId: returnPatientId}});
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
    // this.router.navigate(['/patient/edit'], {queryParams: {patientId: patientId}})
    this.router.navigate(['/patient/edit'])
  }

  goToSearchPatient() {
    this.router.navigate(['patient/search'], {queryParams: {searchMode: true}});
  }

  goToPatientView(patientId: number) {
    this.router.navigate(['/patient'], {queryParams: {patientId: patientId}});
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

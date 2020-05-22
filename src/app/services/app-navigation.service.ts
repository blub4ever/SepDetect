import {EventEmitter, Injectable, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  @Output() showSidebar: EventEmitter<boolean> = new EventEmitter();

  @Output() reloadPatient: EventEmitter<boolean> = new EventEmitter();

  goToEditScoreValue(scoreValueId: number, returnPatientId: number) {
    this.router.navigate(['score'], {queryParams: {scoreValueId: scoreValueId, patientId: returnPatientId}});
  }

  goToEditPatient(patientId: number) {
    this.router.navigate(['/patient/edit'], {queryParams: {patientId: patientId}})
  }

  goToPatientView(patientId: number) {
    this.router.navigate(['/patient'], {queryParams: {patientId: patientId}});
  }

  goToSearchPatient() {
    this.router.navigate(['patient/search']);
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

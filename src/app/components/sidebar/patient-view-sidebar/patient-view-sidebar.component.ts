import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '@app/services/application.service';
import {AuthenticationService} from '@app/services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-patient-view-sidebar',
  templateUrl: './patient-view-sidebar.component.html',
  styleUrls: ['./patient-view-sidebar.component.scss']
})
export class PatientViewSidebarComponent implements OnInit {

  patientId: number;

  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'))
  }

  closeOverlay(): void {
    this.applicationService.showSidebar.emit(false);
  }

  goToPatient() {
    this.router.navigate(['patients']);
    this.applicationService.showSidebar.emit(false);
  }

  goToNewScore() {
    this.router.navigate(['score'], {queryParams: {scoreValueId: 0, patientId: this.patientId}});
    this.applicationService.showSidebar.emit(false);
  }

  logout() {
    this.authenticationService.logout();
    this.applicationService.showSidebar.emit(false);
  }

}

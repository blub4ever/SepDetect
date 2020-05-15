import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/services';
import {ApplicationService} from '@app/services/application.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-list-sidebar',
  templateUrl: './patient-list-sidebar.component.html',
  styleUrls: ['./patient-list-sidebar.component.scss']
})
export class PatientListSidebarComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
  }

  closeOverlay(): void {
    this.applicationService.showSidebar.emit(false);
  }


  goToEditPatient() {
    this.router.navigate(['/patient/edit', 0]);
    this.applicationService.showSidebar.emit(false);
  }

  logout() {
    this.authenticationService.logout();
    this.applicationService.showSidebar.emit(false);
  }
}

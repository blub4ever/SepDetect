import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/services';
import {ApplicationService} from '@app/services/application.service';

@Component({
  selector: 'app-patient-list-sidebar',
  templateUrl: './patient-list-sidebar.component.html',
  styleUrls: ['./patient-list-sidebar.component.scss']
})
export class PatientListSidebarComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
  }

  closeOverlay(): void {
    this.applicationService.showSidebar.emit(false);
  }

  logout() {
    this.authenticationService.logout();
    this.applicationService.showSidebar.emit(false);
  }
}

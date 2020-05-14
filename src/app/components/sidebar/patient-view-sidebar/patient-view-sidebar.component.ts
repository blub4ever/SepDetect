import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '@app/services/application.service';
import {AuthenticationService} from '@app/services';

@Component({
  selector: 'app-patient-view-sidebar',
  templateUrl: './patient-view-sidebar.component.html',
  styleUrls: ['./patient-view-sidebar.component.scss']
})
export class PatientViewSidebarComponent implements OnInit {

  constructor(
    private applicationService: ApplicationService,
    private authenticationService: AuthenticationService) {
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

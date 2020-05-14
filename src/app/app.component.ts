import {Component, OnInit} from '@angular/core';
import {User} from './model';
import {AuthenticationService} from '@app/services';
import {ApplicationService} from "@app/services/application.service";

@Component({selector: 'app', templateUrl: 'app.component.html'})
export class AppComponent implements OnInit{

  user: User;

  sidebarVisible: Boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.applicationService.showSidebar.subscribe(show => {
      this.sidebarVisible = show;
    })
  }

  logout() {
    this.authenticationService.logout();
  }
}

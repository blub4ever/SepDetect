import {Component} from '@angular/core';

import {User} from '@app/model';
import {AuthenticationService} from '@app/services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent {
  user: User;

  constructor(private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
  }
}

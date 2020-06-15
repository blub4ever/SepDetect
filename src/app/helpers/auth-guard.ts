import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from '@app/services';

/**
 * Klasse wird bei jeder Anfrage aktiviert und überprüft ob der User eingeloggt ist.
 */
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userAuth;
    if (user) {
      // authorised so return true
      return true;
    }

    // nicht eingeloggt, navigiere zur Login-Page
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}

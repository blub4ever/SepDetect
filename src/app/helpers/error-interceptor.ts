import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthenticationService} from '@app/services';

/**
 * Error-Interceptor, wird ausgeführt wenn ein Json-Request einen Fehler wirft.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) {
        // auto logout 401 oder 403
        this.authenticationService.logout();
      }

      const error = err.message || err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}

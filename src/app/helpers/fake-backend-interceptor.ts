import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        // case url.endsWith('/login') && method === 'POST':
        //   return authenticate();
        // case url.endsWith('/patients') && method === 'GET':
        //   return patiens();
        // case url.match(/\/patient\/\d+$/) && method === 'GET':
        //   return patien();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function patien() {
      return ok(
        {
          personId: 1,
          piz: '34839543',
          active: true,
          person: {
            surname: 'Test',
            lastName: 'Test',
            gender: 'W'
          },
          organization: {
            id: 2,
            name: 'Test Org'
          },
          scores: [
            {
              id: 1,
              date: '02-04-2020',
              completed: false,
              listOrder: 0,
              values: [
                {
                  id: 1,
                  date: '02-04-2020',
                  poa: 1,
                  gcs: 2,
                  map: 2,
                  liver: 1,
                  coagulation: 2,
                  krea: 1,
                  total: 10,
                  listOrder: 1
                }, {
                  id: 2,
                  date: '03-04-2020',
                  poa: 1,
                  gcs: 2,
                  map: 2,
                  liver: 1,
                  coagulation: 2,
                  krea: 1,
                  total: 11,
                  listOrder: 2
                }, {
                  id: 3,
                  date: '04-04-2020',
                  poa: 1,
                  gcs: 2,
                  map: 2,
                  liver: 1,
                  coagulation: 2,
                  krea: 1,
                  total: 12,
                  listOrder: 3
                }, {
                  id: 4,
                  date: '05-04-2020',
                  poa: 1,
                  gcs: 2,
                  map: 2,
                  liver: 1,
                  coagulation: 2,
                  krea: 1,
                  total: 11,
                  listOrder: 4
                }, {
                  id: 5,
                  date: '06-04-2020',
                  poa: 1,
                  gcs: 2,
                  map: 2,
                  liver: 1,
                  coagulation: 2,
                  krea: 1,
                  total: 9,
                  listOrder: 5
                }, {
                  id: 6,
                  date: '07-04-2020',
                  poa: 1,
                  gcs: 2,
                  map: 2,
                  liver: 1,
                  coagulation: 2,
                  krea: 1,
                  total: 9,
                  listOrder: 5
                }, {
                  id: 7,
                  date: '08-04-2020',
                  poa: 1,
                  gcs: 2,
                  map: 2,
                  liver: 1,
                  coagulation: 2,
                  krea: 1,
                  total: 9,
                  listOrder: 5
                }, {
                  id: 8,
                  date: '09-04-2020',
                  poa: 1,
                  gcs: 2,
                  map: 2,
                  liver: 1,
                  coagulation: 2,
                  krea: 1,
                  total: 9,
                  listOrder: 5
                }
              ]
            }
          ]
        }
      );
    }

    function patiens() {
      return ok(
        [
          {
            personId: 1,
            person: {
              surname: 'Test',
              lastName: 'Test',
              gender: 'W'
            }
          },
          {
            personId: 2,
            person: {
              surname: 'Test',
              lastName: 'Test',
              gender: 'W'
            }
          },
          {
            personId: 3,
            person: {
              surname: 'Test',
              lastName: 'Test',
              gender: 'W'
            }
          }
        ]
      );
    }

    // route functions

    function authenticate() {
      const {username, password} = body;
      return ok({
        id: 1,
        username: username,
        firstName: 'test',
        lastName: 'test',
        token: 'fake-jwt-token'
      })
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized();

      const user = users.find(x => x.id === idFromUrl());
      return ok(user);
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({status: 200, body}));
    }

    function error(message) {
      return throwError({error: {message}});
    }

    function unauthorized() {
      return throwError({status: 401, error: {message: 'Unauthorised'}});
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};

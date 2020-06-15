import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {User} from '@app/model';
import {UserAuth} from '@app/model/user-auth';

/**
 * Authentication Service. Verwaltet die Authentifizierung des Benutzers mit dem Backend.
 */
@Injectable({providedIn: 'root'})
export class AuthenticationService {

  /**
   * Speichert das vom Backend zurückgegebene UserAuth Objekt.
   */
  private userSubject: BehaviorSubject<UserAuth>;

  /**
   * Observable für userSubject
   */
  public user: Observable<UserAuth>;

  /**
   * Konstruktor, Varibalen werden per Autowire übergeben.
   */
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  /**
   * Gibt das UserAuth Objekt zurück.
   */
  public get userAuth(): UserAuth {
    return this.userSubject.value;
  }

  /**
   * Gibt das User Objekt zurück.
   */
  public get userValue(): User {
    return this.userSubject.value.user;
  }

  /**
   * Führt einen Login-Versuch am Backend durch. Ist dieser erfolgreich wird das zurückgegebene UserAuth-Objekt
   * im localStorage gespeichert.
   * @param username Username
   * @param password Passwort
   */
  login(username, password): Observable<UserAuth> {
    return this.http.post<UserAuth>(`${environment.apiUrl}/login`, {name: username, pw: password})
      .pipe(map(user => {
        // speichere Benutzer und JWT Token
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  /**
   * Führt einen Logout durch in dem es den Benutzer aus dem localStorage löscht.
   * Navigiert zur Login-Page zurück.
   */
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

}

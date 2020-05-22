import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {MessageService} from "primeng";
import {AuthenticationService} from "@app/services";

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * LoginComponent, zeigt eine Seite für den Benutzerlogin
 */
export class LoginComponent implements OnInit {

  /**
   * FormGroup enthält die Input-Elemente
   */
  form: FormGroup;

  /**
   * Wird wahr wenn der Submit-Button gedrückt wird und die Anfrage gegen das Backend läuft.
   */
  loading = false;

  /**
   * Wird wahr wenn der Submit-Button gedrückt wird. Sind die Input-Felder nicht korrekt ausgefüllt, wird ein Fehler
   * angezeigt.
   */
  submitted = false;

  /**
   * Geht der User über eine andere Adresse als / auf die Webseite wird die Adresse hier zwischengespeichert.
   * Sobald der Login erfolgreich war, wird der Benutzer wieder auf die ursprüngliche Seite weitergeleitet.
   */
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {
  }

  /**
   * On Komponent Init
   */
  ngOnInit() {
    // baue form mit username und password
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // finde return url, default:  '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * Methode wird beim abschicken des Login-Forms ausgeführt.
   */
  onSubmit() {
    this.submitted = true;

    // stop, falls es Fehler beim Ausfüllen der Eingabefelder gab
    if (this.form.invalid) {
      return;
    }

    // loading verhindert das erneute abschicken des Login-Forms
    this.loading = true;
    this.authenticationService.login(this.form.controls.username.value, this.form.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // Fehleranzeige
          this.messageService.add({
            severity: 'error',
            summary: 'Login fehlgeschalgen',
            detail: 'Passwort oder Benutzername stimmen nicht!'
          });
          this.loading = false;
        });
  }
}

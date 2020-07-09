import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Patient, Person} from "@app/model";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientEditFormComponent} from "@app/components/subcomponents/patient-edit-form/patient-edit-form.component";
import {PatientService} from "@app/services/rest/patient.service";
import {AppNavigationService} from "@app/services/app-navigation.service";
import {MessageService} from "primeng";
import {debounce, flatMap} from "rxjs/operators";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit, AfterViewInit {

  /**
   * Form Komponente, enthält Referenz zur Sub-Komponente mit Eingabefeldern.
   */
  @ViewChild("patientEditForm")
  private patientEditForm: PatientEditFormComponent;

  /**
   * Seiten Titel, Edit oder New
   */
  pageTitle: string = "";

  /**
   * Patient der bearbeitet werden soll
   */
  patient: Patient;

  /**
   * Ähnliche Patenten, wird nur befüllt wenn EditMode = New ist (neuer Patient erstellen)
   */
  proposedPatients: Patient[];

  /**
   * Modus der Komponente, entweder New zum Erstellen eines neuen Patienten, Search für die Suche oder Edit zum Bearbeiten
   */
  mode: EditMode = EditMode.NEW;

  /**
   * Subscription für die Suche
   */
  searchSubscription: Subscription;

  /**
   * Konstruktor setzt den Modus der Komponente. Wir ein Patient mit dem Routing übergeben, wird die Komponente in den
   * Edit Modus gesetzt, andernfalls wird ein neues Patienten-Objekt erstellt und die Komponente wird in den New Modus
   * versetzt. Wird im Routing der Parameter searchMode gesetzt und der Parameter searchMode der URL angehängt, läuft
   * die Komponente im SeachMOde
   * Parameter werden per Autowire gesetzt.
   */
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    public nav: AppNavigationService) {

    // wird patient übergeben = Edit
    if (this.router.getCurrentNavigation().extras.state) {
      // setzt Page Titel für Edit
      this.pageTitle = "Patient bearbeiten";
      this.patient = this.router.getCurrentNavigation().extras.state.patient;
      this.mode = EditMode.EDIT
    } else {
      // Neuer Patient
      this.patient = new Patient();
      this.patient.person = new Person();
      // setzt Search or New Mode
      this.mode = this.route.snapshot.queryParamMap.get('searchMode') != undefined ? EditMode.SEACH : EditMode.NEW;
      // Setzte Titel für Search or New Mode
      this.pageTitle = this.route.snapshot.queryParamMap.get('searchMode') != undefined ? "Patient suchen" : "Patient anlegen";
    }
  }

  ngOnInit(): void {
  }

  /**
   * Wird nach dem die UI-Initialisiert ist ausgeführt. ngOnInit kann hier nicht verwendet werden, da der Patient
   * ggf noch nicht gesetzt wurde.
   */
  ngAfterViewInit() {
    // workaround, da sonst die Daten nicht in der UI angezeigt werden
    setTimeout(() => {
      if (this.patient.personId) {
        // setzte Patienten-Daten wenn Patient eine ID hat = Patient ist nicht neu
        const parts = this.patient.person.birthday.split("-");
        const parsedDate = new Date(parseInt(parts[0], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[2], 10));
        this.patientEditForm.form.patchValue({
          lastName: this.patient.person.lastName,
          surName: this.patient.person.surname,
          piz: this.patient.piz,
          birthday: parsedDate,
          gender: this.patient.person.gender,
          room: this.patient.room,
          organization: this.patient.organization
        })
      }
    });

    // Wenn nicht im Edit Mode, wird automatisch gesucht, wenn Eingabefelder sich ändern.
    if (this.mode != EditMode.EDIT) {
      this.searchSubscription = this.patientEditForm.form.valueChanges.pipe(
        debounce(() => interval(500)),
        flatMap(() => {
          return this.patientService.findPatients(this.patientEditForm.form.controls.lastName.value,
            this.patientEditForm.form.controls.surName.value,
            this.patientEditForm.form.controls.birthday.value,
            this.patientEditForm.form.controls.gender.value)
        })
      ).subscribe(patients => {
        this.proposedPatients = patients
      }, error => {
        console.log(error)
      })
    }
  }

  /**
   *  Erstellt einen neuen Patienten oder speichert geänderte Daten. Abhängig vom aktuellen Modus
   */
  createOrEditPatient() {
    if (this.patientEditForm.submit()) {
      this.patient.person.surname = this.patientEditForm.form.controls.surName.value;
      this.patient.person.lastName = this.patientEditForm.form.controls.lastName.value;
      this.patient.person.gender = this.patientEditForm.form.controls.gender.value;
      this.patient.person.birthday = this.patientEditForm.form.controls.birthday.value;
      this.patient.piz = this.patientEditForm.form.controls.piz.value;
      this.patient.room = this.patientEditForm.form.controls.room.value;
      this.patient.organization = this.patientEditForm.form.controls.organization.value;

      if (this.mode == EditMode.EDIT) {
        this.patientService.editPatient(this.patient).subscribe(patient => {
          this.nav.goToPatientView(patient.personId)
        })
      } else if (this.mode == EditMode.NEW) {
        this.patientService.createPatient(this.patient).subscribe(patient => {
          this.nav.goToPatients();
        })
      }
    }
  }

  /**
   * Aktiviert eine Patientenvorschlag, wenn dieser beim erstellen eines neuen Patienten ausgewählt wurde.
   * @param patient
   */
  addDatabasePatient(patient: Patient) {
    if (!patient.active) {
      this.patientService.togglePatientActiveStatus(patient.personId, true).subscribe(x => {
        this.nav.goToPatients()
        this.messageService.add({
          severity: 'success',
          summary: 'Patient dearchivert',
          detail: `Der Patient (${patient.person.lastName}, ${patient.person.surname}) wurde erfolgreich dearchivert!`
        });
      }, error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Interner Fehler',
          detail: 'Patient konnte nicht dearchiviert werden!'
        });
      })
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Patient aktiv',
        detail: 'Der Patient ist bereits aktiv!'
      });
      this.nav.goToPatients();
    }
  }

  /**
   * Bricht das erstellen/editieren ab, geht zur Patientenübersicht zurück
   */
  abort() {
    if (this.patient.personId) {
      this.nav.goToPatientView(this.patient.personId)
    } else {
      this.nav.goToPatients();
    }
  }

  /**
   * Gibt true zurück, wenn Komponente im Search Mod
   */
  isSearchMode(): boolean {
    return this.mode == EditMode.SEACH
  }

  // Unsubscribe
  ngOnDestroy() {
    // nicht im Edit Mode
    if (this.searchSubscription)
      this.searchSubscription.unsubscribe();
  }
}

enum EditMode {
  SEACH,
  NEW,
  EDIT
}

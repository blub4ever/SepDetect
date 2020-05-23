import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "@app/services";
import {Organization, Patient, Person} from "@app/model";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientEditFormComponent} from "@app/components/subcomponents/patient-edit-form/patient-edit-form.component";
import {PatientService} from "@app/services/rest/patient.service";
import {AppNavigationService} from "@app/services/app-navigation.service";
import {MessageService} from "primeng";
import {debounce, flatMap} from "rxjs/operators";
import {interval} from "rxjs";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit, AfterViewInit {


  @ViewChild("patientEditForm")
  private patientEditForm: PatientEditFormComponent

  pageTitle: string = "";

  patient: Patient;

  proposedPatients: Patient[];

  mode: EditMode = EditMode.NEW;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    public nav: AppNavigationService) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.pageTitle = "Patient bearbeiten"
      this.patient = this.router.getCurrentNavigation().extras.state.patient;
      this.mode = EditMode.EDIT
    } else {
      this.patient = new Patient();
      this.patient.person = new Person();
      this.mode = this.route.snapshot.queryParamMap.get('searchMode') != undefined ? EditMode.SEACH : EditMode.NEW;
      this.pageTitle = this.route.snapshot.queryParamMap.get('searchMode') != undefined ? "Patient suchen" :"Patient anlegen";
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.patient.personId) {
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
    })

    if (this.mode != EditMode.EDIT) {
      this.patientEditForm.form.valueChanges.pipe(
        debounce(() => interval(500)),
        flatMap(() => {
          return this.patientService.findPatients(this.patientEditForm.form.controls.lastName.value,
            this.patientEditForm.form.controls.surName.value,
            this.patientEditForm.form.controls.birthday.value,
            this.patientEditForm.form.controls.gender.value)
        })
      ).subscribe(patients => {
        console.log(patients)
        this.proposedPatients = patients
      }, error => {
        console.log(error)
      })
    }
  }

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

  addDatabasePatient(patient: Patient) {
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
  }

  abort() {
    if (this.patient.personId) {
      this.nav.goToPatientView(this.patient.personId)
    } else {
      this.nav.goToPatients();
    }
  }

  isSearchMode(): boolean {
    return this.mode == EditMode.SEACH
  }
}

enum EditMode {
  SEACH,
  NEW,
  EDIT
}

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public nav: AppNavigationService) {
  }

  ngOnInit(): void {
    const patientId = Number(this.route.snapshot.queryParamMap.get('patientId'));

    if (!patientId) {
      this.pageTitle = "Patient anlegen"
      this.patient = new Patient();
      this.patient.person = new Person();
    } else {
      this.pageTitle = "Patient bearbeiten"
      this.patientService.getPatient(patientId).subscribe(patient => {
        this.patient = patient
        const parts = patient.person.birthday.split("-");
        const parsedDate = new Date(parseInt(parts[0], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[2], 10));
        console.log(parsedDate)
        this.patientEditForm.form.patchValue({
          lastName: patient.person.lastName,
          surName: patient.person.surname,
          piz: patient.piz,
          birthday: parsedDate,
          gender: patient.person.gender,
          room: patient.room,
          organization: patient.organization
        })
      }, error => {
        this.nav.goToPatients()
        this.messageService.add({
          severity: 'error',
          summary: 'Interner Fehler',
          detail: 'Fehler beim laden des Patienten!'
        });
      })
    }


  }

  ngAfterViewInit() {
    if (!this.patient.personId) {
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

      if (this.patient.personId) {
        this.patientService.editPatient(this.patient).subscribe(patient => {
          this.nav.goToPatientView(patient.personId)
        })
      } else {
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
}

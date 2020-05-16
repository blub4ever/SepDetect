import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "@app/services";
import {Organization, Patient, Person} from "@app/model";
import {Router} from "@angular/router";
import {PatientEditFormComponent} from "@app/components/subcomponents/patient-edit-form/patient-edit-form.component";
import {PatientService} from "@app/services/rest/patient.service";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {


  @ViewChild("patientEditForm")
  private patientEditForm: PatientEditFormComponent

  constructor(
    private patientService: PatientService,
    private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.patientEditForm)
  }

  goToPatients() {
    this.router.navigate(['/patients']);
  }

  createPatient() {
    if (this.patientEditForm.validate()) {
      const patient = new Patient();
      const person = new Person();
      person.surname = this.patientEditForm.surName;
      person.lastName = this.patientEditForm.lastName;
      person.gender = this.patientEditForm.gender;
      person.birthday = this.patientEditForm.birthday;
      patient.person = person
      patient.piz = this.patientEditForm.piz;
      patient.room = this.patientEditForm.room
      patient.organization = this.patientEditForm.selectedOrganization

      this.patientService.createPatient(patient).subscribe(patient => {
        this.router.navigate(['/patients']);
      })
    }
  }
}

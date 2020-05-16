import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Organization, Patient} from "@app/model";
import {SelectItem} from "primeng";
import {tokenReference} from "@angular/compiler";
import {AuthenticationService} from "@app/services";

@Component({
  selector: 'app-patient-edit-form',
  templateUrl: './patient-edit-form.component.html',
  styleUrls: ['./patient-edit-form.component.scss']
})
export class PatientEditFormComponent implements OnInit {

  lastName: string;
  lastNameValid: boolean = false;

  surName: string;
  surNameValid: boolean = false;

  piz: string;
  pizValid: boolean = false;

  birthday: string;
  birthdayValid: boolean = false;

  gender: string = '?';
  genderValid: boolean = false;
  genders: SelectItem[];

  room: string;
  roomValid: boolean = false;

  selectedOrganization: Organization = null;
  organizations: SelectItem[];
  organizationValid: boolean = false

  patient: Patient;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.genders = [
      {label: 'Unbekannt Geschlecht', value: "?"},
      {label: 'Männlich', value: "M"},
      {label: 'Weiblich', value: "W"},
      {label: 'Drittes Geschlecht', value: "D"},
    ]

    const organizations = this.authenticationService.userValue.organization;
    this.organizations = [
      {label: 'Auswählen', value: null}
    ]

    for (const organization of organizations) {
      this.organizations.push({label: organization.name, value: organization})
    }
  }

  validate(): boolean {
    let result = true;

    if (this.lastName == undefined || this.lastName == '') {
      result = false;
      this.lastNameValid = true;
    } else {
      this.lastNameValid = false;
    }

    if (this.surName == undefined || this.surName == '') {
      result = false;
      this.surNameValid = true;
    } else {
      this.surNameValid = false;
    }

    if (this.piz == undefined || this.piz == '') {
      result = false;
      this.pizValid = true;
    } else {
      this.pizValid = false;
    }

    if (this.birthday == undefined) {
      result = false;
      this.birthdayValid = true;
    } else {
      this.birthdayValid = false;
    }

    if (this.gender == undefined) {
      result = false;
      this.genderValid = true;
    } else {
      this.genderValid = false;
    }

    if (this.room == undefined) {
      result = false;
      this.roomValid = true;
    } else {
      this.roomValid = false;
    }

    if(this.selectedOrganization == null){
      result = false;
      this.organizationValid = true;
    }else{
      this.organizationValid = false;
    }

    return result
  }
}

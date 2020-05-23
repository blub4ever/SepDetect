import {Component, Input, OnInit, ViewChild} from '@angular/core';
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

  /**
   * FormGroup enthält die Input-Elemente
   */
  form: FormGroup;

  /**
   * Wird wahr wenn der Submit-Button gedrückt wird. Sind die Input-Felder nicht korrekt ausgefüllt, wird ein Fehler
   * angezeigt.
   */
  submitted = false;

  genders: SelectItem[];

  organizations: SelectItem[];

  @Input("patient")
  patient: Patient;

  @Input()
  searchMode: boolean = false

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    // baue form mit username und password
    this.form = this.formBuilder.group({
      lastName: ['', Validators.required],
      surName: ['', Validators.required],
      piz: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      room: ['', Validators.required],
      organization: ['', Validators.required]
    });

    this.form.controls.birthday.valueChanges.subscribe(x => {
      console.log(x)
    })

    this.genders = [
      {label: 'Unbekannt Geschlecht', value: "?"},
      {label: 'Männlich', value: "M"},
      {label: 'Weiblich', value: "W"},
      {label: 'Drittes Geschlecht', value: "D"},
    ]

    const organizations = this.authenticationService.userValue.organization;
    this.organizations = [
      {label: 'Organisationseinheit Auswählen', value: null}
    ]

    for (const organization of organizations) {
      this.organizations.push({label: organization.name, value: organization})
    }
  }

  submit(): boolean {
    this.submitted = true
    // stop, falls es Fehler beim Ausfüllen der Eingabefelder gab
    if (this.form.invalid) {
      return false;
    }
    return true
  }
}

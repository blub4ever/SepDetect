import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Patient} from "@app/model";

@Component({
  selector: 'app-patient-edit-form',
  templateUrl: './patient-edit-form.component.html',
  styleUrls: ['./patient-edit-form.component.scss']
})
export class PatientEditFormComponent implements OnInit {

  form: FormGroup;
  patient: Patient;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      lastName: ['', Validators.required],
      surName: ['', Validators.required],
      piz: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }
}

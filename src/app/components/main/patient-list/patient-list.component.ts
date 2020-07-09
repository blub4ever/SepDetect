import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Patient} from "@app/model";
import {PatientService} from "@app/services/rest/patient.service";
import {Router} from "@angular/router";
import {AppNavigationService} from "@app/services";

/**
 * Diese Komponente listet alle aktiven Patienten auf.
 */
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements AfterViewInit {

  /**
   * Liste der aktiven Patienten
   */
  patients: Patient[] = [];

  constructor(
    private patientService: PatientService,
    public nav : AppNavigationService,
    private router: Router) {
  }

  /**
   * Lädt list der aktive Patienten
   */
  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    console.log('AfterViewInit');
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
    })
  }
}

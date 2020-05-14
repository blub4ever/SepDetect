import {Component, Input, OnInit} from '@angular/core';
import {Patient} from '@app/model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.scss']
})
export class PatientItemComponent implements OnInit {

  @Input() patient: Patient;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPatient() {
    this.router.navigate(['/patient', this.patient.personId]);
  }

}

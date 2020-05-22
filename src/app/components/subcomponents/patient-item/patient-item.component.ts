import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Patient} from '@app/model';
import {Router} from '@angular/router';
import {AppNavigationService} from "@app/services";

@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.scss']
})
export class PatientItemComponent implements OnInit {

  @Input()
  patient: Patient;

  @Input()
  details: boolean = true

  constructor(public nav: AppNavigationService) {
  }

  ngOnInit(): void {
  }

  @HostListener('click', ['$event'])
  onClick(e) {
  }
}

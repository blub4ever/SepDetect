import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/services';
import {Router} from '@angular/router';
import {AppNavigationService} from "@app/services/app-navigation.service";

@Component({
  selector: 'app-patient-list-sidebar',
  templateUrl: './patient-list-sidebar.component.html',
  styleUrls: ['./patient-list-sidebar.component.scss']
})
export class PatientListSidebarComponent implements OnInit {

  constructor(
    public nav: AppNavigationService) {
  }

  ngOnInit(): void {
  }
}

import {Component, OnInit} from '@angular/core';
import {AppNavigationService} from "@app/services/app-navigation.service";

@Component({
  selector: 'app-patient-edit-sidebar',
  templateUrl: './patient-edit-sidebar.component.html',
  styleUrls: ['./patient-edit-sidebar.component.scss']
})
export class PatientEditSidebarComponent implements OnInit {

  constructor(public nav: AppNavigationService) {
  }

  ngOnInit(): void {
  }

}

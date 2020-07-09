import {Component, OnInit} from '@angular/core';
import {AppNavigationService} from '@app/services';

/**
 * Navigationskomponente für PatientenSuche
 */
@Component({
  selector: 'app-patient-search-sidebar',
  templateUrl: './patient-search-sidebar.component.html',
  styleUrls: ['./patient-search-sidebar.component.scss']
})
export class PatientSearchSidebarComponent {
  constructor(public nav: AppNavigationService) {
  }
}


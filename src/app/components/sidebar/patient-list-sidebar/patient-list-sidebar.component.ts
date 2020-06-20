import {Component, OnInit} from '@angular/core';
import {AppNavigationService} from '@app/services/app-navigation.service';

/**
 * Navigationskomponente für PatientenListe
 */
@Component({
  selector: 'app-patient-list-sidebar',
  templateUrl: './patient-list-sidebar.component.html',
  styleUrls: ['./patient-list-sidebar.component.scss']
})
export class PatientListSidebarComponent {

  constructor(
    public nav: AppNavigationService) {
  }
}


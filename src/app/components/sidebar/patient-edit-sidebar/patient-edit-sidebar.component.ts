import {Component, OnInit} from '@angular/core';
import {AppNavigationService} from '@app/services/app-navigation.service';
import {Router} from '@angular/router';

/**
 * Navigationskomponente für PatientEditKomponente
 */
@Component({
  selector: 'app-patient-edit-sidebar',
  templateUrl: './patient-edit-sidebar.component.html',
  styleUrls: ['./patient-edit-sidebar.component.scss']
})
export class PatientEditSidebarComponent {

  constructor(public nav: AppNavigationService,
              private router: Router) {
    // if (this.router.getCurrentNavigation().extras.state) {
    //  console.log(this.router.getCurrentNavigation().extras.state.patient);
    // }
  }
}

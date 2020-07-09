import {Component, OnInit} from '@angular/core';
import {AppNavigationService} from '@app/services/app-navigation.service';

/**
 * Navigation für die About-Komponente
 */
@Component({
  selector: 'app-about-sidebar',
  templateUrl: './about-sidebar.component.html',
  styleUrls: ['./about-sidebar.component.scss']
})
export class AboutSidebarComponent {
  constructor(public nav: AppNavigationService) {
  }
}


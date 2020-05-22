import {Component, OnInit} from '@angular/core';
import {AppNavigationService} from "@app/services/app-navigation.service";

@Component({
  selector: 'app-about-sidebar',
  templateUrl: './about-sidebar.component.html',
  styleUrls: ['./about-sidebar.component.scss']
})
export class AboutSidebarComponent implements OnInit {

  constructor(public nav: AppNavigationService) {
  }

  ngOnInit(): void {
  }

}

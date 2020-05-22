import {Component, OnInit} from '@angular/core';
import {User} from './model';
import {AuthenticationService} from '@app/services';
import {NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MessageService} from "primeng";
import {AppNavigationService} from "@app/services/app-navigation.service";

@Component({selector: 'app', templateUrl: 'app.component.html'})
/**
 * Haupt App-Komponente
 */
export class AppComponent implements OnInit {

  /**
   * Wenn wahr, wird die SideBare angezeigt. (Navigation)
   */
  sidebarVisible: boolean;

  /**
   * Routing Subsciption, wird für unsubscribe beim Zerstören der Komponente benötigt.
   */
  routeSubscription: Subscription;

  constructor(
    private nav : AppNavigationService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.nav.showSidebar.subscribe(show => {
      this.sidebarVisible = show;
    });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.messageService.clear();
        this.sidebarVisible = false;
      }
    });
  }

  // unsubscribe to avoid memory leaks
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  logout() {
    this.authenticationService.logout();
  }
}

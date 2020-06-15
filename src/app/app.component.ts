import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/services';
import {NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MessageService} from 'primeng';
import {AppNavigationService} from '@app/services/app-navigation.service';

@Component({selector: 'app', templateUrl: 'app.component.html'})
/**
 * Main App-Komponente, verwaltet die Sidebar
 */
export class AppComponent implements OnInit {

  /**
   * Wenn wahr, wird die SideBare angezeigt. (Navigation)
   */
  sidebarVisible: boolean;

  /**
   * Routing Subscription, wird für unsubscribe beim Zerstören der Komponente benötigt.
   */
  routeSubscription: Subscription;

  /**
   * Konstruktor, Varibalen werden per Autowire übergeben.
   */
  constructor(
    private nav: AppNavigationService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService) {
  }

  /**
   * Wird nach dem Initialisieren ausgeführt
   */
  ngOnInit(): void {
    // Subscription für show Sidebar events
    this.nav.showSidebar.subscribe(show => {
      this.sidebarVisible = show;
    });

    // Alle Messages aufräumen und die Sidebar verstecken wenn per Routing eine andere Seite angesteuert wird.
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.messageService.clear();
        this.sidebarVisible = false;
      }
    });
  }

  // Unsubscribe
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.nav.showSidebar.unsubscribe();
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, mergeMap} from "rxjs/operators";
import {AppNavigationService} from "@app/services/app-navigation.service";

/**
 * Header Komponente
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * Page Main Titel
   */
  @Input()
  pageTitle: string = '';
  @Input()
  pageTitle2: string = '';

  /**
   * Routing Subscription
   */
  routingSubscription: Subscription;

  constructor(private activeRoute: ActivatedRoute,
              private nav: AppNavigationService,
              private router: Router) {
  }

  /**
   * On Komponent Init
   */
  ngOnInit(): void {
    this.subscribeToRouteChangeEvents();
  }

  /**
   * Setzte Seitentitel wenn dieser in der Routing-Tabelle hinterlegt ist. Wird nur gesetzt, wenn manuell kein
   * Seitentitel gesetzt wurde.
   * @param routeData Routing Data
   */
  private setTitleFromRouteData(routeData) {
    if (routeData && routeData['title'] && this.pageTitle == undefined) {
      this.pageTitle = routeData['title'];
    }
  }

  /**
   * Gibt das letzte Routing Child zurück.
   * @param route Router
   */
  private static getLatestChild(route) {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  /**
   * Subscription für Routing Change Events
   */
  private subscribeToRouteChangeEvents() {
    // Setzte initialen Titel
    const latestRoute = HeaderComponent.getLatestChild(this.activeRoute);
    if (latestRoute) {
      this.setTitleFromRouteData(latestRoute.data.getValue());
    }

    // subscription für Routing-Events, zum setzten des Titels aus Routing Data
    this.routingSubscription = this.router.events.pipe(
      // Filtert Routing End events
      filter(event => event instanceof NavigationEnd),
      map(() => this.activeRoute),
      map((route) => HeaderComponent.getLatestChild(route)),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    ).subscribe((event) => {
      this.setTitleFromRouteData(event);
    });
  }

  /**
   * Zeigt die Sidebar
   */
  public showSidebar() {
    this.nav.showSidebar.emit(true);
  }

  // Unsubscribe
  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }
}

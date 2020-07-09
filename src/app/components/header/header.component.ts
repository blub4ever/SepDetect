import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, mergeMap} from "rxjs/operators";
import {AppNavigationService} from "@app/services/app-navigation.service";
import {Subscription} from "rxjs";

/**
 * Header Komponente
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  pageTitle = '';

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
   * Subscription to rooting events
   */
  ngOnInit(): void {
    this.subscribeToRouteChangeEvents();
  }

  /**
   * Sets den Titel der HeaderKomponente, wenn pageTitel gesetzt wird dieser genommen, andernfalls der, der in den
   * routing Informationen angeben wurde.
   * @param routeData
   */
  private setTitleFromRouteData(routeData) {
    if (routeData && routeData['title'] && this.pageTitle == undefined) {
      this.pageTitle = routeData['title'];
    }
  }

  /**
   * Gibt das letzte Kind des Routing Trees zurück
   * @param route
   */
  private static getLatestChild(route) {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  /**
   * Subscription to rooting events
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

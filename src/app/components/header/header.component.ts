import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, mergeMap} from "rxjs/operators";
import {AppNavigationService} from "@app/services/app-navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  pageTitle: string = '';
  @Input()
  pageTitle2: string = '';

  constructor(private activeRoute: ActivatedRoute,
              private nav : AppNavigationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscribeToRouteChangeEvents();
  }

  private setTitleFromRouteData(routeData) {
    if (routeData && routeData['title'] && this.pageTitle == undefined) {
      this.pageTitle = routeData['title'];
    }
  }

  private getLatestChild(route) {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private subscribeToRouteChangeEvents() {

    // Set initial title
    const latestRoute = this.getLatestChild(this.activeRoute);
    if (latestRoute) {
      this.setTitleFromRouteData(latestRoute.data.getValue());
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activeRoute),
      map((route) => this.getLatestChild(route)),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    ).subscribe((event) => {
      this.setTitleFromRouteData(event);
    });
  }

  public showSidebar() {
    this.nav.showSidebar.emit(true);
  }
}

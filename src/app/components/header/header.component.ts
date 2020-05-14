import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, mergeMap} from "rxjs/operators";
import {ApplicationService} from "@app/services/application.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pageTitle: string = "";

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.subscribeToRouteChangeEvents();
  }

  private setTitleFromRouteData(routeData) {
    if (routeData && routeData['title']) {
      this.pageTitle = routeData['title'];
    } else {
      this.pageTitle = '';
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
    this.applicationService.showSidebar.emit(true);
  }
}

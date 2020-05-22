import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import * as Hammer from 'hammerjs';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor, JwtInterceptor} from '@app/helpers';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '@app/app.routing';
import {LoginComponent} from '@app/components';
import {PatientListComponent} from './components/main/patient-list/patient-list.component';
import {HeaderComponent} from './components/header/header.component';
import {
  AccordionModule,
  ButtonModule,
  CalendarModule, ChartModule, ConfirmationService, ConfirmDialogModule, DropdownModule,
  InputTextModule, MessageService, RadioButtonModule,
  ScrollPanelModule,
  SidebarModule,
  SlideMenuModule, StepsModule, ToastModule
} from 'primeng';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PatientItemComponent} from './components/subcomponents/patient-item/patient-item.component';
import {PatientViewComponent} from './components/main/patient-view/patient-view.component';
import {PatientEditFormComponent} from './components/subcomponents/patient-edit-form/patient-edit-form.component';
import {PatientListSidebarComponent} from './components/sidebar/patient-list-sidebar/patient-list-sidebar.component';
import {PatientViewSidebarComponent} from './components/sidebar/patient-view-sidebar/patient-view-sidebar.component';
import {PatientEditComponent} from './components/main/patient-edit/patient-edit.component';
import {ScoreValueInputComponent} from './components/subcomponents/score-value-input/score-value-input.component';
import {ScoreValueItemComponent} from './components/subcomponents/score-value-item/score-value-item.component';
import {ScoreValueEditSidebarComponent} from './components/sidebar/score-value-edit-sidebar/score-value-edit-sidebar.component';
import {ScoreValueEditComponent} from "@app/components/main/score-value-edit/score-value-edit.component";
import {AboutComponent} from './components/main/about/about.component';
import {AboutSidebarComponent} from './components/sidebar/about-sidebar/about-sidebar.component';
import {PatientEditSidebarComponent} from './components/sidebar/patient-edit-sidebar/patient-edit-sidebar.component';
import {CarouselComponent} from './components/main/score-value-edit/carousel/carousel.component';
import {CarouselItemElement} from "@app/components/main/score-value-edit/carousel-item-element";
import {CarouselItemDirective} from "@app/components/main/score-value-edit/carousel/carousel-item-directive";
import {ReversePipe} from "@app/helpers/reverse-pipe";

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: {direction: Hammer.DIRECTION_ALL},
    pinch: {enable: false},
    rotate: {enable: false}
  };
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    SlideMenuModule,
    ScrollPanelModule,
    CalendarModule,
    SidebarModule,
    ChartModule,
    DropdownModule,
    RadioButtonModule,
    ToastModule,
    ConfirmDialogModule,
    AccordionModule,
    StepsModule,
    HammerModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    PatientListComponent,
    HeaderComponent,
    PatientItemComponent,
    PatientViewComponent,
    PatientEditFormComponent,
    PatientListSidebarComponent,
    PatientViewSidebarComponent,
    PatientEditComponent,
    ScoreValueEditComponent,
    ScoreValueInputComponent,
    ScoreValueItemComponent,
    ScoreValueEditSidebarComponent,
    AboutComponent,
    AboutSidebarComponent,
    PatientEditSidebarComponent,
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemElement,
    ReversePipe
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig},
    MessageService,
    ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

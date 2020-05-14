import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AlertComponent} from './components/alert/alert.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor, JwtInterceptor} from '@app/helpers';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '@app/app.routing';
import {LoginComponent} from '@app/components';
import {fakeBackendProvider} from "@app/helpers/fake-backend-interceptor";
import { PatientListComponent } from './components/main/patient-list/patient-list.component';
import { HeaderComponent } from './components/header/header.component';
import {
  ButtonModule,
  CalendarModule, ChartModule, DropdownModule,
  InputTextModule,
  ScrollPanelModule,
  SidebarModule,
  SlideMenuModule
} from 'primeng';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PatientItemComponent } from './components/subcomponents/patient-item/patient-item.component';
import { PatientComponent } from './components/main/patient/patient.component';
import { PatientEditFormComponent } from './components/subcomponents/patient-edit-form/patient-edit-form.component';
import { PatientListSidebarComponent } from './components/sidebar/patient-list-sidebar/patient-list-sidebar.component';
import { PatientViewSidebarComponent } from './components/sidebar/patient-view-sidebar/patient-view-sidebar.component';
import { PatientEditComponent } from './components/main/patient-edit/patient-edit.component';
import { ScoreValueInputComponent } from './components/subcomponents/score-value-input/score-value-input.component';
import { ScoreValueItemComponent } from './components/subcomponents/score-value-item/score-value-item.component';
import {ScoreValueComponent} from '@app/components/main/score-value/score-value.component';

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
    DropdownModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    PatientListComponent,
    HeaderComponent,
    PatientItemComponent,
    PatientComponent,
    PatientEditFormComponent,
    PatientListSidebarComponent,
    PatientViewSidebarComponent,
    PatientEditComponent,
    ScoreValueComponent,
    ScoreValueInputComponent,
    ScoreValueItemComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}

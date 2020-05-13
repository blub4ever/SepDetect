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
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { HeaderComponent } from './components/header/header.component';
import { PatientHeaderComponent } from './components/header/include/patient-header/patient-header.component';
import {ButtonModule, InputTextModule, ScrollPanelModule, SlideMenuModule} from "primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PatientItemComponent } from './components/patient-list/patient-item/patient-item.component';
import { PatientComponent } from './components/patient/patient.component';

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
    ScrollPanelModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    PatientListComponent,
    HeaderComponent,
    PatientHeaderComponent,
    PatientItemComponent,
    PatientComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}

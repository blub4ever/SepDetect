import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AlertComponent} from './components/alert/alert.component';
import {HomeComponent} from './components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor, JwtInterceptor} from '@app/helpers';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '@app/app.routing';
import {LoginComponent} from '@app/components';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    HomeComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

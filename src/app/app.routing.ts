import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent, PatientHeaderComponent} from './components/';
import {AuthGuard} from './helpers';
import {PatientListComponent} from "@app/components/patient-list/patient-list.component";
import {PatientComponent} from "@app/components/patient/patient.component";

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      {
        path: '',
        data: {title: 'Patienten'},
        component: PatientListComponent,
      },
      {
        path: '',
        outlet: 'header-nav',
        component: PatientHeaderComponent
      }
    ]
  },
  {
    path: 'patient', canActivate: [AuthGuard], children: [
      {
        path: '',
        data: {title: 'Patient'},
        component: PatientComponent,
      },
      {
        path: '',
        outlet: 'header-nav',
        component: PatientHeaderComponent
      }
    ]
  },
  {path: 'login', component: LoginComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent, PatientHeaderComponent} from './components/';
import {AuthGuard} from './helpers';
import {PatientListComponent} from "@app/components/patient-list/patient-list.component";

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

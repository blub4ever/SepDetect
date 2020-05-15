import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './helpers';
import {PatientListComponent} from "@app/components/main/patient-list/patient-list.component";
import {PatientComponent} from "@app/components/main/patient/patient.component";
import {PatientListSidebarComponent} from '@app/components/sidebar/patient-list-sidebar/patient-list-sidebar.component';
import {LoginComponent} from '@app/components';
import {PatientViewSidebarComponent} from '@app/components/sidebar/patient-view-sidebar/patient-view-sidebar.component';
import {PatientEditComponent} from '@app/components/main/patient-edit/patient-edit.component';
import {ScoreValueEditComponent} from '@app/components/main/score-value-edit/score-value-edit.component';
import {ScoreValueEditSidebarComponent} from "@app/components/sidebar/score-value-edit-sidebar/score-value-edit-sidebar.component";

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
        component: PatientListSidebarComponent
      }
    ]
  },
  {
    path: 'patient/:id', canActivate: [AuthGuard], children: [
      {
        path: '',
        data: {title: 'Patient'},
        component: PatientComponent,
      },
      {
        path: '',
        outlet: 'header-nav',
        component: PatientViewSidebarComponent
      }
    ]
  },
  {
    path: 'patient/edit/:id', canActivate: [AuthGuard], children: [
      {
        path: '',
        data: {title: 'Patient anlegen/bearbeiten'},
        component: PatientEditComponent,
      },
      {
        path: '',
        outlet: 'header-nav',
        component: PatientViewSidebarComponent
      }
    ]
  },
  {
    path: 'score', canActivate: [AuthGuard], children: [
      {
        path: '',
        data: {title: 'Score bearbeiten'},
        component: ScoreValueEditComponent,
      },
      {
        path: '',
        outlet: 'header-nav',
        component: ScoreValueEditSidebarComponent
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

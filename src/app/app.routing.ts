import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './helpers';
import {PatientListComponent} from "@app/components/main/patient-list/patient-list.component";
import {PatientViewComponent} from "@app/components/main/patient-view/patient-view.component";
import {PatientListSidebarComponent} from '@app/components/sidebar/patient-list-sidebar/patient-list-sidebar.component';
import {LoginComponent} from '@app/components';
import {PatientViewSidebarComponent} from '@app/components/sidebar/patient-view-sidebar/patient-view-sidebar.component';
import {PatientEditComponent} from '@app/components/main/patient-edit/patient-edit.component';
import {ScoreValueEditComponent} from '@app/components/main/score-value-edit/score-value-edit.component';
import {ScoreValueEditSidebarComponent} from "@app/components/sidebar/score-value-edit-sidebar/score-value-edit-sidebar.component";
import {AboutComponent} from "@app/components/main/about/about.component";
import {AboutSidebarComponent} from "@app/components/sidebar/about-sidebar/about-sidebar.component";
import {PatientEditSidebarComponent} from "@app/components/sidebar/patient-edit-sidebar/patient-edit-sidebar.component";

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
    path: 'patient', canActivate: [AuthGuard], children: [
      {
        path: '',
        data: {title: 'Patient'},
        component: PatientViewComponent,
      },
      {
        path: '',
        outlet: 'header-nav',
        component: PatientViewSidebarComponent
      }
    ]
  },
  {
    path: 'patient/edit', canActivate: [AuthGuard], children: [
      {
        path: '',
        data: {title: 'Patient anlegen/bearbeiten'},
        component: PatientEditComponent,
      },
      {
        path: '',
        outlet: 'header-nav',
        component: PatientEditSidebarComponent
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
  {
    path: 'about', canActivate: [AuthGuard], children: [
      {
        path: '',
        data: {title: 'Über diese App'},
        component: AboutComponent,
      },
      {
        path: '',
        outlet: 'header-nav',
        component: AboutSidebarComponent
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

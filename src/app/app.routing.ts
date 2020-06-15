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
import {PatientSearchSidebarComponent} from "@app/components/sidebar/patient-search-sidebar/patient-search-sidebar.component";

/**
 * Routing Regeln für die Benutzernavigation
 */
const routes: Routes = [
  /**
   * Routing für Patientenliste
   */
  {
    path: '', canActivate: [AuthGuard], children: [
      // Main view
      {
        path: '',
        data: {title: 'Patienten'},
        component: PatientListComponent,
      },
      // Navigation
      {
        path: '',
        outlet: 'header-nav',
        component: PatientListSidebarComponent
      }
    ]
  },
  /**
   * Routing für Patientenübersicht
   */
  {
    path: 'patient', canActivate: [AuthGuard], children: [
      // Main view
      {
        path: '',
        data: {title: 'Patient'},
        component: PatientViewComponent,
      },
      // Navigation
      {
        path: '',
        outlet: 'header-nav',
        component: PatientViewSidebarComponent
      }
    ]
  },
  /**
   * Routing für Patienten bearbeiten oder anlegen
   */
  {
    path: 'patient/edit', canActivate: [AuthGuard], children: [
      // Main view
      {
        path: '',
        data: {title: 'Patient anlegen/bearbeiten'},
        component: PatientEditComponent,
      },
      // Navigation
      {
        path: '',
        outlet: 'header-nav',
        component: PatientEditSidebarComponent
      }
    ]
  },
  /**
   * Routing zum erstellen oder ändern eines SOFA-Scores
   */
  {
    path: 'score', canActivate: [AuthGuard], children: [
      // Main view
      {
        path: '',
        data: {title: 'Score bearbeiten'},
        component: ScoreValueEditComponent,
      },
      // Navigation
      {
        path: '',
        outlet: 'header-nav',
        component: ScoreValueEditSidebarComponent
      }
    ]
  },
  {
    path: 'about', canActivate: [AuthGuard], children: [
      // Main view
      {
        path: '',
        data: {title: 'Über diese App'},
        component: AboutComponent,
      },
      // Navigation
      {
        path: '',
        outlet: 'header-nav',
        component: AboutSidebarComponent
      }
    ]
  },
  /**
   * Routing für die Patientensuche
   */
  {
    path: 'patient/search', canActivate: [AuthGuard], children: [
      // Main view
      {
        path: '',
        data: {title: 'Patient suchen', searchMode: true},
        component: PatientEditComponent,
      },
      // Navigation
      {
        path: '',
        outlet: 'header-nav',
        component: PatientSearchSidebarComponent
      }
    ]
  },
  // Routing für die Loginseite
  {path: 'login', component: LoginComponent},
  // Trifft keine Regel zu zurück zum Login
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

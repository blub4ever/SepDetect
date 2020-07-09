import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Patient} from '@app/model';
import {Router} from '@angular/router';
import {AppNavigationService} from "@app/services";

/**
 * Komponente für die Anzeige eines Patienten in einer Liste. Hat die Form eines kleines Rechecks
 */
@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.scss']
})
export class PatientItemComponent implements OnInit {

  /*+
  Patient
   */
  @Input()
  patient: Patient;

  /**
   * Zeigt mehr details an wenn true
   */
  @Input()
  details: boolean = true

  constructor(public nav: AppNavigationService) {
  }

  ngOnInit(): void {
  }

  /**
   * Listen für externe onClick events
   * @param e
   */
  @HostListener('click', ['$event'])
  onClick(e) {
  }
}

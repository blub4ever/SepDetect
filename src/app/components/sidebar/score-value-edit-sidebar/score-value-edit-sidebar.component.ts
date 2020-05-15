import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-score-value-edit-sidebar',
  templateUrl: './score-value-edit-sidebar.component.html',
  styleUrls: ['./score-value-edit-sidebar.component.scss']
})
export class ScoreValueEditSidebarComponent implements OnInit {

  patientId: number;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.queryParamMap.get('patientId'));
    console.log(this.patientId)
    console.log("---")
  }

}

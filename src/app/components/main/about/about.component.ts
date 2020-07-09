import { Component, OnInit } from '@angular/core';

/**
 * About Komponente, zeigt Impressum, sonst keine Interaktion
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}

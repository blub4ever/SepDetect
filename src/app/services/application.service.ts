import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  @Output() showSidebar: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }
}

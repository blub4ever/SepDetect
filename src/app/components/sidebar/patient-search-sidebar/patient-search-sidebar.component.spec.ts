import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSearchSidebarComponent } from './patient-search-sidebar.component';

describe('PatientSearchSidebarComponent', () => {
  let component: PatientSearchSidebarComponent;
  let fixture: ComponentFixture<PatientSearchSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSearchSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSearchSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

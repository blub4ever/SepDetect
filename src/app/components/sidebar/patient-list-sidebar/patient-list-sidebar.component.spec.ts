import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListSidebarComponent } from './patient-list-sidebar.component';

describe('PatientListSidebarComponent', () => {
  let component: PatientListSidebarComponent;
  let fixture: ComponentFixture<PatientListSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientListSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

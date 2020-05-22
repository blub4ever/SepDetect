import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditSidebarComponent } from './patient-edit-sidebar.component';

describe('PatientEditSidebarComponent', () => {
  let component: PatientEditSidebarComponent;
  let fixture: ComponentFixture<PatientEditSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientEditSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEditSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

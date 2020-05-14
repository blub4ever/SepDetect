import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientViewSidebarComponent } from './patient-view-sidebar.component';

describe('PatientViewSidebarComponent', () => {
  let component: PatientViewSidebarComponent;
  let fixture: ComponentFixture<PatientViewSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientViewSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientViewSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

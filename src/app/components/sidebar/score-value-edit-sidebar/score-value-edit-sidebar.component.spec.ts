import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreValueEditSidebarComponent } from './score-value-edit-sidebar.component';

describe('ScoreValueEditSidebarComponent', () => {
  let component: ScoreValueEditSidebarComponent;
  let fixture: ComponentFixture<ScoreValueEditSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreValueEditSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreValueEditSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

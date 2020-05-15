import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreValueEditComponent } from './score-value.component';

describe('ScoreValueComponent', () => {
  let component: ScoreValueEditComponent;
  let fixture: ComponentFixture<ScoreValueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreValueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreValueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

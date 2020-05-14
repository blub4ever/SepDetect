import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreValueInputComponent } from './score-value-input.component';

describe('ScoreValueInputComponent', () => {
  let component: ScoreValueInputComponent;
  let fixture: ComponentFixture<ScoreValueInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreValueInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreValueInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

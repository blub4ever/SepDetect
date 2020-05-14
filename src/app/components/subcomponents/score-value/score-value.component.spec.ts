import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreValueComponent } from './score-value.component';

describe('ScoreValueComponent', () => {
  let component: ScoreValueComponent;
  let fixture: ComponentFixture<ScoreValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

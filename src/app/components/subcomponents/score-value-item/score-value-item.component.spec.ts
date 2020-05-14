import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreValueItemComponent } from './score-value-item.component';

describe('ScoreValueItemComponent', () => {
  let component: ScoreValueItemComponent;
  let fixture: ComponentFixture<ScoreValueItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreValueItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreValueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

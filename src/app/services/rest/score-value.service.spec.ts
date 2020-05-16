import { TestBed } from '@angular/core/testing';

import { ScoreValueService } from './score-value.service';

describe('ScoreValueService', () => {
  let service: ScoreValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

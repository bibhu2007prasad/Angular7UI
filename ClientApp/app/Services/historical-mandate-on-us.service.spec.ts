import { TestBed } from '@angular/core/testing';

import { HistoricalMandateOnUsService } from './historical-mandate-on-us.service';

describe('HistoricalMandateOnUsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoricalMandateOnUsService = TestBed.get(HistoricalMandateOnUsService);
    expect(service).toBeTruthy();
  });
});

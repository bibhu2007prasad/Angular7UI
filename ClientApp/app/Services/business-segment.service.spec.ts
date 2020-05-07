import { TestBed } from '@angular/core/testing';

import { BusinessSegmentService } from './business-segment.service';

describe('BusinessSegmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessSegmentService = TestBed.get(BusinessSegmentService);
    expect(service).toBeTruthy();
  });
});

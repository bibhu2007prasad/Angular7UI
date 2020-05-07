import { TestBed } from '@angular/core/testing';

import { ReturnRegionService } from './return-region.service';

describe('ReturnRegionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReturnRegionService = TestBed.get(ReturnRegionService);
    expect(service).toBeTruthy();
  });
});

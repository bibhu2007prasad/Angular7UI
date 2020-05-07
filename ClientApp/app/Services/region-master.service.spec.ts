import { TestBed } from '@angular/core/testing';

import { RegionMasterService } from './region-master.service';

describe('RegionMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegionMasterService = TestBed.get(RegionMasterService);
    expect(service).toBeTruthy();
  });
});

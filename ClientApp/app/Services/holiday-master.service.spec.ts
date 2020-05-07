import { TestBed } from '@angular/core/testing';

import { HolidayMasterService } from './holiday-master.service';

describe('HolidayMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HolidayMasterService = TestBed.get(HolidayMasterService);
    expect(service).toBeTruthy();
  });
});

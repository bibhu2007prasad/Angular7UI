import { TestBed } from '@angular/core/testing';

import { ChargeMasterService } from './charge-master.service';

describe('ChargeMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChargeMasterService = TestBed.get(ChargeMasterService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SettlementtypeMasterService } from './settlementtype-master.service';

describe('SettlementtypeMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettlementtypeMasterService = TestBed.get(SettlementtypeMasterService);
    expect(service).toBeTruthy();
  });
});

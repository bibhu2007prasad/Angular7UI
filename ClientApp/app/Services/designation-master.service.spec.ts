import { TestBed } from '@angular/core/testing';

import { DesignationMasterService } from './designation-master.service';

describe('DesignationMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignationMasterService = TestBed.get(DesignationMasterService);
    expect(service).toBeTruthy();
  });
});

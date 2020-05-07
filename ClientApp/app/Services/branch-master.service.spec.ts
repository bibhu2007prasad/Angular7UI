import { TestBed } from '@angular/core/testing';

import { BranchMasterService } from './branch-master.service';

describe('BranchMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BranchMasterService = TestBed.get(BranchMasterService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SubCorporateSetUpService } from './sub-corporate-set-up.service';

describe('SubCorporateSetUpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubCorporateSetUpService = TestBed.get(SubCorporateSetUpService);
    expect(service).toBeTruthy();
  });
});

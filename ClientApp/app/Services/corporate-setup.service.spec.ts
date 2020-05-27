import { TestBed } from '@angular/core/testing';

import { CorporateSetupService } from './corporate-setup.service';

describe('CorporateSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorporateSetupService = TestBed.get(CorporateSetupService);
    expect(service).toBeTruthy();
  });
});

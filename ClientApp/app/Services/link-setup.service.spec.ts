import { TestBed } from '@angular/core/testing';

import { LinkSetupService } from './link-setup.service';

describe('LinkSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkSetupService = TestBed.get(LinkSetupService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RegSuccessService } from './reg-success.service';

describe('RegSuccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegSuccessService = TestBed.get(RegSuccessService);
    expect(service).toBeTruthy();
  });
});

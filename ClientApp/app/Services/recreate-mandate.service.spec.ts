import { TestBed } from '@angular/core/testing';

import { RecreateMandateService } from './recreate-mandate.service';

describe('RecreateMandateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecreateMandateService = TestBed.get(RecreateMandateService);
    expect(service).toBeTruthy();
  });
});

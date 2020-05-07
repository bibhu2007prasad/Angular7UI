import { TestBed } from '@angular/core/testing';

import { HitoricalMandateService } from './hitorical-mandate.service';

describe('HitoricalMandateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HitoricalMandateService = TestBed.get(HitoricalMandateService);
    expect(service).toBeTruthy();
  });
});

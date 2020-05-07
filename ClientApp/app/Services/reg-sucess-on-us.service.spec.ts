import { TestBed } from '@angular/core/testing';

import { RegSucessOnUsService } from './reg-sucess-on-us.service';

describe('RegSucessOnUsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegSucessOnUsService = TestBed.get(RegSucessOnUsService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { NachSucessOnUsService } from './nach-sucess-on-us.service';

describe('NachSucessOnUsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NachSucessOnUsService = TestBed.get(NachSucessOnUsService);
    expect(service).toBeTruthy();
  });
});

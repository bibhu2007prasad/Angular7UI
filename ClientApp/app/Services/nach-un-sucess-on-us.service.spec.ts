import { TestBed } from '@angular/core/testing';

import { NachUnSucessOnUsService } from './nach-un-sucess-on-us.service';

describe('NachUnSucessOnUsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NachUnSucessOnUsService = TestBed.get(NachUnSucessOnUsService);
    expect(service).toBeTruthy();
  });
});

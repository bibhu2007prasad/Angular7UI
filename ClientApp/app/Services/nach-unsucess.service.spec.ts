import { TestBed } from '@angular/core/testing';

import { NachUnsucessService } from './nach-unsucess.service';

describe('NachUnsucessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NachUnsucessService = TestBed.get(NachUnsucessService);
    expect(service).toBeTruthy();
  });
});

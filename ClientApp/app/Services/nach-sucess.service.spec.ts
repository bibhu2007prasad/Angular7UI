import { TestBed } from '@angular/core/testing';

import { NachSucessService } from './nach-sucess.service';

describe('NachSucessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NachSucessService = TestBed.get(NachSucessService);
    expect(service).toBeTruthy();
  });
});

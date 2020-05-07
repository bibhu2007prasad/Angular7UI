import { TestBed } from '@angular/core/testing';

import { AllUMRNService } from './all-umrn.service';

describe('AllUMRNService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllUMRNService = TestBed.get(AllUMRNService);
    expect(service).toBeTruthy();
  });
});

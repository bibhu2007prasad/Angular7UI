import { TestBed } from '@angular/core/testing';

import { DownloadOldMandateProcInWardService } from './download-old-mandate-proc-in-ward.service';

describe('DownloadOldMandateProcInWardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadOldMandateProcInWardService = TestBed.get(DownloadOldMandateProcInWardService);
    expect(service).toBeTruthy();
  });
});

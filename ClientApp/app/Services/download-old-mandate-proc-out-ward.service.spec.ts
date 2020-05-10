import { TestBed } from '@angular/core/testing';

import { DownloadOldMandateProcOutWardService } from './download-old-mandate-proc-out-ward.service';

describe('DownloadOldMandateProcOutWardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadOldMandateProcOutWardService = TestBed.get(DownloadOldMandateProcOutWardService);
    expect(service).toBeTruthy();
  });
});

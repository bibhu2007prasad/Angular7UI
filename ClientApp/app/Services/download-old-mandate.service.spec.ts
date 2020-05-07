import { TestBed } from '@angular/core/testing';

import { DownloadOldMandateService } from './download-old-mandate.service';

describe('DownloadOldMandateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadOldMandateService = TestBed.get(DownloadOldMandateService);
    expect(service).toBeTruthy();
  });
});

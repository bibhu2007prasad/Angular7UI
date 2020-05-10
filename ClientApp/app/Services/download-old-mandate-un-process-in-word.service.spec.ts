import { TestBed } from '@angular/core/testing';

import { DownloadOldMandateUnProcessInWordService } from './download-old-mandate-un-process-in-word.service';

describe('DownloadOldMandateUnProcessInWordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadOldMandateUnProcessInWordService = TestBed.get(DownloadOldMandateUnProcessInWordService);
    expect(service).toBeTruthy();
  });
});

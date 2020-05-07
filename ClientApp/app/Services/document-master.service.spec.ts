import { TestBed } from '@angular/core/testing';

import { DocumentMasterService } from './document-master.service';

describe('DocumentMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentMasterService = TestBed.get(DocumentMasterService);
    expect(service).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyUploadComponent } from './legacy-upload.component';

describe('LegacyUploadComponent', () => {
  let component: LegacyUploadComponent;
  let fixture: ComponentFixture<LegacyUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegacyUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

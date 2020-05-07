import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSegmentMasterComponent } from './business-segment-master.component';

describe('BusinessSegmentMasterComponent', () => {
  let component: BusinessSegmentMasterComponent;
  let fixture: ComponentFixture<BusinessSegmentMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSegmentMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSegmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnReasonMasterComponent } from './return-reason-master.component';

describe('ReturnReasonMasterComponent', () => {
  let component: ReturnReasonMasterComponent;
  let fixture: ComponentFixture<ReturnReasonMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnReasonMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnReasonMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

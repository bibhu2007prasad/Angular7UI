import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementTypeMasterComponent } from './settlement-type-master.component';

describe('SettlementTypeMasterComponent', () => {
  let component: SettlementTypeMasterComponent;
  let fixture: ComponentFixture<SettlementTypeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlementTypeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlementTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

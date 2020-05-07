import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmemberBankSetupComponent } from './submember-bank-setup.component';

describe('SubmemberBankSetupComponent', () => {
  let component: SubmemberBankSetupComponent;
  let fixture: ComponentFixture<SubmemberBankSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmemberBankSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmemberBankSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitPresentmentSetupComponent } from './debit-presentment-setup.component';

describe('DebitPresentmentSetupComponent', () => {
  let component: DebitPresentmentSetupComponent;
  let fixture: ComponentFixture<DebitPresentmentSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitPresentmentSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitPresentmentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

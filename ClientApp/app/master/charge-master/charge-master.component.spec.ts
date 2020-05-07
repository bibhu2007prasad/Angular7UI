import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeMasterComponent } from './charge-master.component';

describe('ChargeMasterComponent', () => {
  let component: ChargeMasterComponent;
  let fixture: ComponentFixture<ChargeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

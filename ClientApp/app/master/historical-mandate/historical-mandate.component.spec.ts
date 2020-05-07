import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalMandateComponent } from './historical-mandate.component';

describe('HistoricalMandateComponent', () => {
  let component: HistoricalMandateComponent;
  let fixture: ComponentFixture<HistoricalMandateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalMandateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

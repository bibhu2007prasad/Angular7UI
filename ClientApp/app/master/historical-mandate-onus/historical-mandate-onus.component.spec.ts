import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalMandateOnusComponent } from './historical-mandate-onus.component';

describe('HistoricalMandateOnusComponent', () => {
  let component: HistoricalMandateOnusComponent;
  let fixture: ComponentFixture<HistoricalMandateOnusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalMandateOnusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalMandateOnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

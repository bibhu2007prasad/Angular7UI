import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewhistoricalmandateComponent } from './newhistoricalmandate.component';

describe('NewhistoricalmandateComponent', () => {
  let component: NewhistoricalmandateComponent;
  let fixture: ComponentFixture<NewhistoricalmandateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewhistoricalmandateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewhistoricalmandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

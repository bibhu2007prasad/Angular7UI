import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReCreateMandateComponent } from './re-create-mandate.component';

describe('ReCreateMandateComponent', () => {
  let component: ReCreateMandateComponent;
  let fixture: ComponentFixture<ReCreateMandateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReCreateMandateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReCreateMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSuccessOnusComponent } from './reg-success-onus.component';

describe('RegSuccessOnusComponent', () => {
  let component: RegSuccessOnusComponent;
  let fixture: ComponentFixture<RegSuccessOnusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegSuccessOnusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegSuccessOnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsmmasterComponent } from './psmmaster.component';

describe('PsmmasterComponent', () => {
  let component: PsmmasterComponent;
  let fixture: ComponentFixture<PsmmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsmmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsmmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

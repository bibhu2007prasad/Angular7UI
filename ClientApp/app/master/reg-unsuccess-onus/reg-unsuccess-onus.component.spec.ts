import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegUnsuccessOnusComponent } from './reg-unsuccess-onus.component';

describe('RegUnsuccessOnusComponent', () => {
  let component: RegUnsuccessOnusComponent;
  let fixture: ComponentFixture<RegUnsuccessOnusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegUnsuccessOnusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegUnsuccessOnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

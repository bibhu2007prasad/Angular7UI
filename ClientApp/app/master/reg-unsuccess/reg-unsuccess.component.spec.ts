import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegUnsuccessComponent } from './reg-unsuccess.component';

describe('RegUnsuccessComponent', () => {
  let component: RegUnsuccessComponent;
  let fixture: ComponentFixture<RegUnsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegUnsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegUnsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

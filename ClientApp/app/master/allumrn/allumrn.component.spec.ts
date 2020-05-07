import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllumrnComponent } from './allumrn.component';

describe('AllumrnComponent', () => {
  let component: AllumrnComponent;
  let fixture: ComponentFixture<AllumrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllumrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllumrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

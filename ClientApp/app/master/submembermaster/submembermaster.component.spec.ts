import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmembermasterComponent } from './submembermaster.component';

describe('SubmembermasterComponent', () => {
  let component: SubmembermasterComponent;
  let fixture: ComponentFixture<SubmembermasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmembermasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmembermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

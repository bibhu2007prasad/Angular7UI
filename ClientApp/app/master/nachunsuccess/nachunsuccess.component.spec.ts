import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachunsuccessComponent } from './nachunsuccess.component';

describe('NachunsuccessComponent', () => {
  let component: NachunsuccessComponent;
  let fixture: ComponentFixture<NachunsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachunsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachunsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

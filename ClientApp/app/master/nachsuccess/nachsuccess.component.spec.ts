import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachsuccessComponent } from './nachsuccess.component';

describe('NachsuccessComponent', () => {
  let component: NachsuccessComponent;
  let fixture: ComponentFixture<NachsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

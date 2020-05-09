import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachunsuccessonusComponent } from './nachunsuccessonus.component';

describe('NachunsuccessonusComponent', () => {
  let component: NachunsuccessonusComponent;
  let fixture: ComponentFixture<NachunsuccessonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachunsuccessonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachunsuccessonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

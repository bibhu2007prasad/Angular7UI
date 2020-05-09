import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NachsuccessonusComponent } from './nachsuccessonus.component';

describe('NachsuccessonusComponent', () => {
  let component: NachsuccessonusComponent;
  let fixture: ComponentFixture<NachsuccessonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NachsuccessonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NachsuccessonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

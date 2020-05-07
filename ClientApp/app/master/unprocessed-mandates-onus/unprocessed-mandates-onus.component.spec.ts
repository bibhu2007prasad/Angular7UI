import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnprocessedMandatesOnusComponent } from './unprocessed-mandates-onus.component';

describe('UnprocessedMandatesOnusComponent', () => {
  let component: UnprocessedMandatesOnusComponent;
  let fixture: ComponentFixture<UnprocessedMandatesOnusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnprocessedMandatesOnusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnprocessedMandatesOnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnprocessedMandatesComponent } from './unprocessed-mandates.component';

describe('UnprocessedMandatesComponent', () => {
  let component: UnprocessedMandatesComponent;
  let fixture: ComponentFixture<UnprocessedMandatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnprocessedMandatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnprocessedMandatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

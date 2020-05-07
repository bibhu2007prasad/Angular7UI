import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedMandatesComponent } from './processed-mandates.component';

describe('ProcessedMandatesComponent', () => {
  let component: ProcessedMandatesComponent;
  let fixture: ComponentFixture<ProcessedMandatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessedMandatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedMandatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

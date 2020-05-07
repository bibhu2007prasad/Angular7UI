import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedMandatesOnusComponent } from './processed-mandates-onus.component';

describe('ProcessedMandatesOnusComponent', () => {
  let component: ProcessedMandatesOnusComponent;
  let fixture: ComponentFixture<ProcessedMandatesOnusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessedMandatesOnusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedMandatesOnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

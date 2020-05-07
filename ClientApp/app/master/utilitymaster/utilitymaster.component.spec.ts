import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitymasterComponent } from './utilitymaster.component';

describe('UtilitymasterComponent', () => {
  let component: UtilitymasterComponent;
  let fixture: ComponentFixture<UtilitymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

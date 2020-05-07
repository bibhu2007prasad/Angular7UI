import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatesetupComponent } from './corporatesetup.component';

describe('CorporatesetupComponent', () => {
  let component: CorporatesetupComponent;
  let fixture: ComponentFixture<CorporatesetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporatesetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporatesetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

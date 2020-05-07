import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RblBranchMasterComponent } from './rbl-branch-master.component';

describe('RblBranchMasterComponent', () => {
  let component: RblBranchMasterComponent;
  let fixture: ComponentFixture<RblBranchMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RblBranchMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RblBranchMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

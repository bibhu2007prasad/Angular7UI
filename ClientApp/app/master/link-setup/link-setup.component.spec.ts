import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSetupComponent } from './link-setup.component';

describe('LinkSetupComponent', () => {
  let component: LinkSetupComponent;
  let fixture: ComponentFixture<LinkSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

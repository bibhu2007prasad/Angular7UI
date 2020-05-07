import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationtemplateComponent } from './communicationtemplate.component';

describe('CommunicationtemplateComponent', () => {
  let component: CommunicationtemplateComponent;
  let fixture: ComponentFixture<CommunicationtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

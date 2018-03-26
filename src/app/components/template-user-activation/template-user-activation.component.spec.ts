import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateUserActivationComponent } from './template-user-activation.component';

describe('TemplateUserActivationComponent', () => {
  let component: TemplateUserActivationComponent;
  let fixture: ComponentFixture<TemplateUserActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateUserActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateUserActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

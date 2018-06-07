import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePasswordRecoveryComponent } from './template-password-recovery.component';

describe('TemplatePasswordRecoveryComponent', () => {
  let component: TemplatePasswordRecoveryComponent;
  let fixture: ComponentFixture<TemplatePasswordRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatePasswordRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePasswordRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

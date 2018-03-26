import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateReportComponent } from './template-report.component';

describe('TemplateReportComponent', () => {
  let component: TemplateReportComponent;
  let fixture: ComponentFixture<TemplateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

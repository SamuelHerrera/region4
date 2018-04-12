import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicReportFakeComponent } from './basic-report-fake.component';

describe('BasicReportFakeComponent', () => {
  let component: BasicReportFakeComponent;
  let fixture: ComponentFixture<BasicReportFakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicReportFakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicReportFakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

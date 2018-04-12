import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteFakeComponent } from './reporte-fake.component';

describe('ReporteFakeComponent', () => {
  let component: ReporteFakeComponent;
  let fixture: ComponentFixture<ReporteFakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteFakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteFakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisocookiesComponent } from './avisocookies.component';

describe('AvisocookiesComponent', () => {
  let component: AvisocookiesComponent;
  let fixture: ComponentFixture<AvisocookiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisocookiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisocookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

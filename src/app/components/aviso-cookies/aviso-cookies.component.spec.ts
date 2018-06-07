import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoCookiesComponent } from './aviso-cookies.component';

describe('AvisoCookiesComponent', () => {
  let component: AvisoCookiesComponent;
  let fixture: ComponentFixture<AvisoCookiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoCookiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

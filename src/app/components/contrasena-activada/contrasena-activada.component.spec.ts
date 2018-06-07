import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrasenaActivadaComponent } from './contrasena-activada.component';

describe('ContrasenaActivadaComponent', () => {
  let component: ContrasenaActivadaComponent;
  let fixture: ComponentFixture<ContrasenaActivadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrasenaActivadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrasenaActivadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivacionUsuarioComponent } from './activacion-usuario.component';

describe('ActivacionUsuarioComponent', () => {
  let component: ActivacionUsuarioComponent;
  let fixture: ComponentFixture<ActivacionUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivacionUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivacionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

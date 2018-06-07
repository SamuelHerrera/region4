import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoConTarjetaComponent } from './pago-con-tarjeta.component';

describe('PagoConTarjetaComponent', () => {
  let component: PagoConTarjetaComponent;
  let fixture: ComponentFixture<PagoConTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoConTarjetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoConTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

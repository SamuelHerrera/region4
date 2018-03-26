import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFacturacionComponent } from './template-facturacion.component';

describe('TemplateFacturacionComponent', () => {
  let component: TemplateFacturacionComponent;
  let fixture: ComponentFixture<TemplateFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

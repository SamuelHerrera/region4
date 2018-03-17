import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioAvaluoComponent } from './envio-avaluo.component';

describe('EnvioAvaluoComponent', () => {
  let component: EnvioAvaluoComponent;
  let fixture: ComponentFixture<EnvioAvaluoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioAvaluoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioAvaluoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaluoEnviadoComponent } from './avaluo-enviado.component';

describe('AvaluoEnviadoComponent', () => {
  let component: AvaluoEnviadoComponent;
  let fixture: ComponentFixture<AvaluoEnviadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaluoEnviadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaluoEnviadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

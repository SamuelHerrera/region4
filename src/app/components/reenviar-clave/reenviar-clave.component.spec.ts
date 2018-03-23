import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReenviarClaveComponent } from './reenviar-clave.component';

describe('ReenviarClaveComponent', () => {
  let component: ReenviarClaveComponent;
  let fixture: ComponentFixture<ReenviarClaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReenviarClaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReenviarClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReenviarComponent } from './reenviar.component';

describe('ReenviarComponent', () => {
  let component: ReenviarComponent;
  let fixture: ComponentFixture<ReenviarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReenviarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReenviarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

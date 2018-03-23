import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCuponesComponent } from './dialog-cupones.component';

describe('DialogCuponesComponent', () => {
  let component: DialogCuponesComponent;
  let fixture: ComponentFixture<DialogCuponesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCuponesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCuponesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

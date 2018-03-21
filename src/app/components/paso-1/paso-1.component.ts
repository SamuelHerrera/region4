import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatVerticalStepper } from '@angular/material';


@Component({
  selector: 'app-paso-1',
  templateUrl: './paso-1.component.html',
  styleUrls: ['./paso-1.component.css']
})
export class Paso1Component implements OnInit, DoCheck {

  lat = 20.975262;
  lng = -89.640562;

  @Input() avaluoForm: any;
  @Output() completed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.avaluoForm['latitud'] = this.lat;
      this.avaluoForm['longitud'] = this.lng;

    }, 2000);
  }

  ngDoCheck() {
    this.verify();
  }

  verify() {
    if (this.avaluoForm['street']
      && this.avaluoForm['num_ext']
      && this.avaluoForm['zip']
      && this.avaluoForm['colonia']
      && this.avaluoForm['municipio']
      && this.avaluoForm['estado']
      && this.avaluoForm['ciudad']) {
      this.completed.emit(true);
    } else {
      this.completed.emit(false);
    }

  }

}

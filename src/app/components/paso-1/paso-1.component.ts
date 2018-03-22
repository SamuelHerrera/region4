import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatVerticalStepper } from '@angular/material';


@Component({
  selector: 'app-paso-1',
  templateUrl: './paso-1.component.html',
  styleUrls: ['./paso-1.component.css']
})
export class Paso1Component implements OnInit {

  lat = 20.975262;
  lng = -89.640562;

  @Input() avaluoForm: any;
  @Output() completed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.avaluoForm['latitud'] = this.lat;
        this.avaluoForm['longitud'] = this.lng;
      });
    } else {
      this.avaluoForm['latitud'] = this.lat;
      this.avaluoForm['longitud'] = this.lng;
    }
  }

  onChange() {
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
      setTimeout(() => {
        this.completed.emit(true);
      });

    } else {
      setTimeout(() => {
        this.completed.emit(false);
      });
    }
  }

}

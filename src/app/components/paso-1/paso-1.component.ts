import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatVerticalStepper } from '@angular/material';
import { YalsService } from '../../services/yals.service';


@Component({
  selector: 'app-paso-1',
  templateUrl: './paso-1.component.html',
  styleUrls: ['./paso-1.component.css']
})
export class Paso1Component implements OnInit {

  zipCode: boolean;

  lat = 21.082189;
  lng = -89.6368873;

  @Input() avaluoForm: any;
  @Output() completed = new EventEmitter<boolean>();

  constructor(private yals: YalsService) { }

  ngOnInit() {
    this.avaluoForm['latitud'] = this.lat;
    this.avaluoForm['longitud'] = this.lng;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.avaluoForm['latitud'] = this.lat;
        this.avaluoForm['longitud'] = this.lng;
      });
    }
  }

  onChange(event) {
    this.verify();
  }

  verify() {

    /*if(this.avaluoForm['zip'].length == 5) {
      this.zipCode = true;
    } else{
      this.zipCode = false;
    }*/

    if (this.avaluoForm['street']
      && this.avaluoForm['num_ext']
      && this.avaluoForm['zip']
      && this.avaluoForm['colonia']
      && this.avaluoForm['municipio']
      && this.avaluoForm['estado']
      && this.avaluoForm['ciudad']) {

      this.yals.getCoords(this.avaluoForm).subscribe((response: any) => {
        console.log(response);
        try {
          this.avaluoForm['latitud'] = this.lat = response.results[0].geometry.location.lat;
          this.avaluoForm['longitud'] = this.lng = response.results[0].geometry.location.lng;
        } catch (e) {
          //do nothing
        }
      });

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

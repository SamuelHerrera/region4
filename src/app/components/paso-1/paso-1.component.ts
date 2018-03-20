import { Component, OnInit, Input } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


@Component({
  selector: 'app-paso-1',
  templateUrl: './paso-1.component.html',
  styleUrls: ['./paso-1.component.css']
})
export class Paso1Component implements OnInit {

  lat = 20.975262;
  lng = -89.640562;

  @Input() avaluoForm: any;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.avaluoForm['latitud'] = this.lat;
      this.avaluoForm['longitud'] = this.lng;
    }, 3000);
  }

}

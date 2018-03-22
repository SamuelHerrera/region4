import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-datosfacturacion',
  templateUrl: './datosfacturacion.component.html',
  styleUrls: ['./datosfacturacion.component.css']
})
export class DatosfacturacionComponent implements OnInit {

  @Input() facturacion: any = {};
  constructor() {
    console.log(this.facturacion.subTotal);
   }

  ngOnInit() {
  }

}

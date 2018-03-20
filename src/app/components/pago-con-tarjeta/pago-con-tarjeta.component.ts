import { Component, OnInit } from '@angular/core';
import { PagofacilService } from '../../services/pagofacil.service';
import { Pagofacilrequest } from '../../models/pagofacil.model';

@Component({
  selector: 'app-pago-con-tarjeta',
  templateUrl: './pago-con-tarjeta.component.html',
  styleUrls: ['./pago-con-tarjeta.component.css']
})
export class PagoConTarjetaComponent implements OnInit {

  disabled = true;
  codigo = false;

  pf: Pagofacilrequest = new Pagofacilrequest();

  constructor(private pagofacil: PagofacilService) { }

  ngOnInit() {
  }

  aplicarCodigo() { }
  pagarAvaluo() {
    this.pf.monto = "1";
    this.pf.email = "samuelherrerafuente@gmail.com"
    this.pagofacil.generatePago(this.pf).subscribe(response => {
      console.log(response);
    });
  }

}

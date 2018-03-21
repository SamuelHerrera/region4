import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PagofacilService } from '../../services/pagofacil.service';
import { Pagofacilrequest } from '../../models/pagofacil.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-pago-con-tarjeta',
  templateUrl: './pago-con-tarjeta.component.html',
  styleUrls: ['./pago-con-tarjeta.component.css']
})
export class PagoConTarjetaComponent implements OnInit {

  @Output() completed = new EventEmitter<boolean>();

  disabled = true;
  codigo = false;

  pf: Pagofacilrequest = new Pagofacilrequest();

  constructor(private pagofacil: PagofacilService, private messageService: MessageService) { }

  ngOnInit() {
  }

  aplicarCodigo() { }
  pagarAvaluo() {
    this.pf.monto = "1";
    this.pf.email = "samuelherrerafuente@gmail.com"
    this.pagofacil.generatePago(this.pf).subscribe(response => {
      console.log(response);
      if (response) {
        this.messageService.add({
          severity: 'success', summary: 'Procesamiento de pago',
          detail: "Su pago se ha procesado satisfactoriamente."
        });
        this.completed.emit(true);
      }
    });
  }

}

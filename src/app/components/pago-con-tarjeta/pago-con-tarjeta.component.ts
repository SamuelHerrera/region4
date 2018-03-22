import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PagofacilService } from '../../services/pagofacil.service';
import { Pagofacilrequest } from '../../models/pagofacil.model';
import { MessageService } from 'primeng/components/common/messageservice';

declare var window: Window;

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
      if (response) {
        this.messageService.add({
          severity: 'success', summary: 'Procesamiento de pago',
          detail: "Su pago se ha procesado satisfactoriamente."
        });
        this.completed.emit(true);
      }
    }, error => {
      this.messageService.add({
        severity: 'error', summary: 'Error procesando pago',
        detail: "Se ha producido un error procesando su pago, porfavor contacte a soporte."
      });
    });
  }

  pagarAvaluoPayPal() {
    this.pagofacil.generatePagoPayPal().subscribe((response: any) => {
      const win = window.open(response.data.response, "Secure Payment");
      if (win) {
        const timer = setInterval(() => {
          if (win.closed) {
            clearInterval(timer);


            if (response) {
              this.messageService.add({
                severity: 'success', summary: 'Procesamiento de pago',
                detail: "Su pago se ha procesado satisfactoriamente."
              });
              this.completed.emit(true);
            }
          }
        }, 500);
      } else {
        this.messageService.add({
          severity: 'error', summary: 'Error procesando pago',
          detail: "Porfavor permite los popups para poder procesar el pago!"
        });
      }
    }, error => {
      this.messageService.add({
        severity: 'error', summary: 'Error procesando pago',
        detail: "Se ha producido un error procesando su pago, porfavor contacte a soporte."
      });
    });
  }
}

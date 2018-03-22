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
  loading = false;
  disabled = true;
  codigo = false;
  pf: Pagofacilrequest = new Pagofacilrequest();

  constructor(private pagofacil: PagofacilService, private messageService: MessageService) { }

  ngOnInit() {
  }

  aplicarCodigo() { }

  pagarAvaluo() {
    this.loading = true;
    this.pf.monto = "1";
    this.pf.email = "region4mid@gmail.com"
    this.pagofacil.generatePago(this.pf).subscribe(response => {
      if (response) {
        this.messageService.add({
          severity: 'success', summary: 'Procesamiento de pago',
          detail: "Su pago se ha procesado satisfactoriamente."
        });
        this.completed.emit(true);
      }
      this.loading = false;
    }, error => {
      this.messageService.add({
        severity: 'error', summary: 'Error procesando pago',
        detail: "Se ha producido un error procesando su pago, porfavor contacte a soporte."
      });
      this.loading = false;
    });
  }

  pagarAvaluoPayPal() {
    this.loading = true;
    this.pagofacil.generatePagoPayPal().subscribe((response: any) => {
      const win = window.open(response.data.response, "Secure Payment");
      if (win) {
        const timer = setInterval(() => {
          if (win.closed) {
            clearInterval(timer);
            const token = response.data.request;
            this.pagofacil.getPagosByToken(token).subscribe((itemres: any) => {
              console.log(itemres);
              if (itemres.data.docs[0]) {
                this.pagofacil.generatePagoPayPal(itemres.data.docs[0].request, itemres.data.docs[0].response)
                  .subscribe((activeres: any) => {
                    if (activeres && activeres.data.autorized) {
                      this.messageService.add({
                        severity: 'success', summary: 'Procesamiento de pago',
                        detail: "Su pago se ha procesado satisfactoriamente."
                      });
                      this.completed.emit(true);
                      this.loading = false;
                    }
                  }, error => {
                    this.messageService.add({
                      severity: 'error', summary: 'Error procesando pago',
                      detail: "Se ha producido un error procesando su pago, porfavor contacte a soporte."
                    });
                    this.loading = false;
                  });
              }
            }, error => {
              this.messageService.add({
                severity: 'error', summary: 'Error procesando pago',
                detail: "Se ha producido un error procesando su pago, porfavor contacte a soporte."
              });
              this.loading = false;
            });
          }
        }, 500);
      } else {
        this.messageService.add({
          severity: 'error', summary: 'Error procesando pago',
          detail: "Porfavor permite los popups para poder procesar el pago!"
        });
        this.loading = false;
      }
    }, error => {
      this.messageService.add({
        severity: 'error', summary: 'Error procesando pago',
        detail: "Se ha producido un error procesando su pago, porfavor contacte a soporte."
      });
      this.loading = false;
    });
  }
}

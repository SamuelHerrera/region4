import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PagofacilService } from '../../services/pagofacil.service';
import { Pagofacilrequest } from '../../models/pagofacil.model';
import { MessageService } from 'primeng/components/common/messageservice';
import { CuponService } from '../../services/cupon.service';

declare var window: Window;

@Component({
  selector: 'app-pago-con-tarjeta',
  templateUrl: './pago-con-tarjeta.component.html',
  styleUrls: ['./pago-con-tarjeta.component.css']
})
export class PagoConTarjetaComponent implements OnInit {

  @Output() completed = new EventEmitter<boolean>();
  @Input() facturacion: any = {};
  loading = false;
  disabled = true;
  codigo = false;
  codigoName = "";
  pf: Pagofacilrequest = new Pagofacilrequest();
  public montoDescuento: any;

  constructor(private pagofacil: PagofacilService, private messageService: MessageService, private cupones: CuponService) { }

  ngOnInit() {
    setTimeout(() => {
      this.facturacion["costoAvaluo"] = 1200;
      this.facturacion["subTotal"] = 1200;
      this.facturacion["total"] = 1200;

      // this.facturacion["costoAvaluo"] = 1;
      // this.facturacion["subTotal"] = 1;
      // this.facturacion["total"] = 1;
    })
  }

  aplicarCodigo() {
    this.cupones.getCuponByName(this.codigoName).subscribe((response: any) => {
      //console.log("Response", response)
      if (response && response.data.docs.length > 0) {
        const porcentajeDescuento = response.data.docs[0].porcentaje;
        if (response.data.docs[0].estado) {

          this.montoDescuento = "Descuento: " + porcentajeDescuento + "% = " + ((porcentajeDescuento * 1200) / 100);
          this.facturacion["subTotal"] = 1200 - ((porcentajeDescuento * 1200) / 100);
          this.facturacion["total"] = 1200 - ((porcentajeDescuento * 1200) / 100);
        } else {

          this.messageService.add({
            severity: 'error', summary: 'Cupón Inválido',
            detail: "El cupón no se encuentra activo."
          });

        }

      } else {
        this.messageService.add({
          severity: 'info', summary: 'Cupón Inválido',
          detail: "El cupón no existe."
        });
      }
    });
  }

  pagarAvaluo() {
    this.completed.emit(true);
    return;



    // this.loading = true;
    // this.pf.monto = this.facturacion["total"];
    // this.pf.email = "region4mid@gmail.com";
    // this.pf.calleyNumero = "Calzada General MAriano Escobedo 748";
    // this.pf.colonia = "Anzures";
    // this.pf.estado = "Ciudad de Mexico";
    // this.pf.municipio = "Ciudad de Mexico";
    // this.pf.pais = "Mexico";
    // this.pagofacil.generatePago(this.pf).subscribe((response: any) => {
    //   if (response) {
    //     if (response.data.response.autorizado === 1) {
    //       console.log(response)
    //       this.messageService.add({
    //         severity: 'success', summary: 'Procesamiento de pago',
    //         detail: "Su pago se ha procesado satisfactoriamente."
    //       });
    //       this.facturacion["formapago"] = "Tarjeta Debito/Credito";
    //       this.facturacion["FechaTransaccion"] = new Date().toLocaleDateString();
    //       this.completed.emit(true);
    //     } else {
    //       let errors = "";
    //       // tslint:disable-next-line:forin
    //       for (const key in response.data.response.error) {
    //         const value = response.data.response.error[key];
    //         errors += value + " <br> ";
    //       }
    //       this.messageService.add({
    //         severity: 'error', summary: 'Error procesando pago',
    //         detail: "Se ha producido un error: " + errors
    //       });
    //     }
    //   }
    //   this.loading = false;
    // }, error => {
    //   this.messageService.add({
    //     severity: 'error', summary: 'Error procesando pago',
    //     detail: "Se ha producido un error procesando su pago, porfavor contacte a soporte."
    //   });
    //   this.loading = false;
    // });
  }

  pagarAvaluoPayPal() {
    console.log(this.facturacion)
    this.loading = true;
    this.pagofacil.generatePagoPayPal(null, null, this.facturacion["total"]).subscribe((response: any) => {
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
                      this.facturacion["formapago"] = "PayPal";
                      this.facturacion["FechaTransaccion"] = new Date().toLocaleDateString();
                      this.loading = false;
                    } else {
                      this.messageService.add({
                        severity: 'info', summary: 'Error procesando pago',
                        detail: "Se ha producido un error procesando su pago, porfavor contacte a soporte."
                      });
                      this.loading = false;
                      this.completed.emit(false);
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

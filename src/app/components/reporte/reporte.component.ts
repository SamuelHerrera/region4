import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatVerticalStepper } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { YalsService } from '../../services/yals.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { group } from '@angular/animations';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  @ViewChild('f0') form0: NgForm;
  @ViewChild('f1') form1: NgForm;
  @ViewChild('f2') form2: NgForm;
  @ViewChild('f3') form3: NgForm;
  @ViewChild('f4') form4: NgForm;

  data: any = [];
  dataRFC: any = [];
  dataCreditCar: any = [];
  zipCode: boolean;
  street = 100;
  num_ext = '489B';
  colonia = 'Bojorquez';
  zip = 9700;
  municipio = 'Mérida';
  ciudad = 'Mérida';
  estado = 'Yucatán';

  /**Maps */
  lat = 21.082189;
  lng = -89.6368873;
  overlays: any[];
  /**Maps */
  contador = 0;

  @Input() avaluoForm: any;
  @Output() completed = new EventEmitter<boolean>();

  timeout = null;

  isNew = false;
  loading = false;
  disabled = true;
  /** */

  /**Paso 3 */
  /** */
  aireAcondicionado = false;
  cocinaIntegral = false;
  gimnasio = false;
  roofGarden = false;
  alberca = false;
  cuartoServicio = false;
  jardin = false;
  amueblado = false;
  estudio = false;
  jacuzzi = false;
  seguridadPrivada = false;
  constructor(private yals: YalsService) {

  }

  ngOnInit() {
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

  anterior() {
    if (this.contador > 0) {
      this.contador -= 1;
    }
  }
  siguiente() {
    switch (this.contador) {
      case 0:
        if (!this.form0.valid) {
          return;
        }
        break;
      case 1:
        if (!this.form1.valid
          || !this.data['tipo_propiedad']
          || !this.data['status_propiedad']
          || !this.data['num_cuartos']
          || !this.data['num_banos']
          || !this.data['num_medio_bano']
          || !this.data['num_parking']
        ) {
          return;
        }
        break;
      case 2:
        if (!this.form2.valid) {
          return;
        }
        break;
      case 3:
        if (!this.form3.valid) {
          return;
        }
        break;
      case 4:
        if (!this.form4.valid) {
          return;
        }
        break;
      default:
        break;
    }
    if (this.contador < 4) {
      this.contador += 1;
    }
  }

  nuevo() {
    this.isNew = !this.isNew;
    this.data['anios_antiguedad'] = 0;
  }


  aplicarCodigo() {
    /*
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
    });*/
  }

  pagarAvaluo() {
    /*
    this.loading = true;
    this.pf.monto = this.facturacion["total"];
    this.pf.email = "region4mid@gmail.com";
    this.pf.calleyNumero = "Calzada General MAriano Escobedo 748";
    this.pf.colonia = "Anzures";
    this.pf.estado = "Ciudad de Mexico";
    this.pf.municipio = "Ciudad de Mexico";
    this.pf.pais = "Mexico";
    this.pagofacil.generatePago(this.pf).subscribe((response: any) => {
      if (response) {
        if (response.data.response.autorizado === 1) {
          console.log(response)
          this.messageService.add({
            severity: 'success', summary: 'Procesamiento de pago',
            detail: "Su pago se ha procesado satisfactoriamente."
          });
          this.facturacion["formapago"] = "Tarjeta Debito/Credito";
          this.facturacion["FechaTransaccion"] = new Date().toLocaleDateString();
          this.completed.emit(true);
        } else {
          let errors = "";
          // tslint:disable-next-line:forin
          for (const key in response.data.response.error) {
            const value = response.data.response.error[key];
            errors += value + " <br> ";
          }
          this.messageService.add({
            severity: 'error', summary: 'Error procesando pago',
            detail: "Se ha producido un error: " + errors
          });
        }
      }
      this.loading = false;
    }, error => {
      this.messageService.add({
        severity: 'error', summary: 'Error procesando pago',
        detail: "Se ha producido un error procesando su pago, porfavor contacte a soporte."
      });
      this.loading = false;
    });*/
  }
  pagarAvaluoPayPal() {
    /*
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
    });*/
  }
}

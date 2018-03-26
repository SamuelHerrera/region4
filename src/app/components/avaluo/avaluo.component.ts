import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YalsService } from '../../services/yals.service';
import { YalsRequest } from '../../models/yals.model';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import { MessageService } from 'primeng/components/common/messageservice';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-avaluo',
  templateUrl: './avaluo.component.html',
  styleUrls: ['./avaluo.component.css'],
  providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class AvaluoComponent implements OnInit {

  isHidden = false;

  index = 0;
  step1 = false;
  step2 = false;
  step3 = true;
  step4 = false;
  selectedAge: string[] = [];
  avaluoForm: any = {};
  facturacion: any = {};
  avaluoResponse: any = null;
  loading = false;
  otroCorreo: any;
  datosHTML: any;
  constructor(private mail: MailService, private router: Router, private yals: YalsService, private messageService: MessageService) {
  }

  ngOnInit() {
  }

  enviarCorreo() {
    const yals_req: YalsRequest = this.avaluoForm;
    yals_req.id_tipo_propiedad = (+yals_req.id_tipo_propiedad);
    yals_req.recamaras = (+yals_req.recamaras);
    yals_req.banos = (+yals_req.banos);
    yals_req.medios_banos = (+yals_req.medios_banos);
    yals_req.estacionamientos = (+yals_req.estacionamientos);
    yals_req.area_construida = (+yals_req.area_construida);
    yals_req.superficie_terreno = (+yals_req.superficie_terreno);
    yals_req.edad = (+yals_req.edad);
    this.loading = true;
    this.yals.generateRequest(yals_req, null).subscribe(response => {
      this.avaluoResponse = response;
      this.index = 4;
      this.loading = false;
      this.messageService.add({
        severity: 'info', summary: 'Reporte',
        detail: `Se ha generado satisfactoriamente su reporte.`
      });
    }, error => {
      this.loading = false;
      this.messageService.add({
        severity: 'error', summary: 'Error procesando reporte',
        detail: `Se ha producido un error procesando su reporte, verifique los datos proporcionados 
        e intente nuevamente, en caso contrario porfavor contacte a soporte.`
      });
    });
    if (this.isHidden) {
      // this.mail.sendMail({ to: "ventas@region4.mx", subject: "Facturacion", text: this.facturacion })
      this.mail.sendMail({
        from: "facturacion@valorinmuebles.mx",
        to: "samuelherrerafuente@gmail.com", subject: "Facturacion",
        html: "<pre>" + JSON.stringify(this.facturacion, undefined, 2) + "</pre>"
      })
        .subscribe(response => {
          this.messageService.add({
            severity: 'info', summary: 'Reporte',
            detail: `Se esta generando su factura, se la haremos llegar en un plazo maximo de 72horas.`
          });
        });
    }
  }

  imprimir() {
    const element = document.getElementById('element-to-print');
    html2pdf(element, {
      margin: 1,
      filename: 'reporte.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  }

  enviarACorreo() {
    this.datosHTML = document.getElementById("mainContainer");

    if (this.otroCorreo != "") {
      console.log(this.otroCorreo);
      this.mail.sendMail({
        from: "usuario@valorinmuebles.com.mx",
        to: this.otroCorreo,
        subject: "Reporte de avalúo",
        html: `<html><header><style>
        `+this.datosHTML+`</body></header></html>`
      }).subscribe((response: any) => {
        //console.log("Respuesta de mail: ",response);
      });

      this.messageService.add({
        severity: 'success', summary: 'Correo enviado',
        detail: 'Se a enviado el reporte a su correo.'
      });
      this.otroCorreo="";
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error correo',
        detail: 'El correo no pudo ser enviado, verifiquee la direccion de correo introducida.'
      });
    }
  }

  // stepchanged(event: any) {
  // }

}

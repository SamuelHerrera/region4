import { Component, OnInit } from '@angular/core';
import { YalsService } from '../../services/yals.service';
import { YalsRequest } from '../../models/yals.model';
import { Router } from '@angular/router';
import * as html2pdf from '../../../assets/js/html2pdf';
import { MessageService } from 'primeng/components/common/messageservice';
import { MailService } from '../../services/mail.service';
import { ObservablesService } from '../../services/observables.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-avaluo',
  templateUrl: './avaluo.component.html',
  styleUrls: ['./avaluo.component.css'],
  providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class AvaluoComponent implements OnInit {

  dataLoaded = false;

  mostrarImprimir = false;

  elementToPrint: any;

  isHidden = false;
  nomCliente: any = {};
  index = 0;
  step1 = false;
  step2 = false;
  step3 = false;
  step4 = false;
  selectedAge: string[] = [];
  avaluoForm: any = {};
  facturacion: any = {};
  avaluoResponse: any = null;
  loading = false;
  otroCorreo: any;
  datosHTML: any;
  public user: Client = new Client();
  constructor(private observableService: ObservablesService, private mail: MailService,
    private yals: YalsService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.observableService.userObservable$.subscribe(user => {
      this.user = user ? user : new Client();
    });
  }


  preload() {
    this.generarAvaluo();
  }

  generarAvaluo() {
    const yals_req: YalsRequest = this.avaluoForm;
    yals_req.id_tipo_propiedad = (+yals_req.id_tipo_propiedad);
    yals_req.recamaras = (+yals_req.recamaras);
    yals_req.banos = (+yals_req.banos);
    yals_req.medios_banos = (+yals_req.medios_banos);
    yals_req.estacionamientos = (+yals_req.estacionamientos);
    yals_req.area_construida = (+yals_req.area_construida);
    yals_req.superficie_terreno = (+yals_req.superficie_terreno);
    yals_req.edad = (+yals_req.edad);
    if (!yals_req.amenities) {
      yals_req['amenities'] = [];
    }


    this.dataLoaded = true;
    this.yals.generateRequest(yals_req, null).subscribe(response => {
      this.avaluoResponse = response;
      if (!this.avaluoResponse.data.response.similares) {
        this.step3 = true;
        this.step4 = true;
        this.messageService.add({
          severity: 'warn', summary: 'Datos Insuficientes',
          detail: `No se han encontrado datos suficientes de la propiedad para realizar un reporte detallado, sin embargo
           podrás descargar un reporte gratuito de los datos encontrados sobre tu propiedad.
          `
        });
        setTimeout(() => {
          this.index = 4;
        }, 2000);
      } else {
        this.step3 = true;
        setTimeout(() => {
          this.index = 3;
        }, 2000);
      }

      this.mostrarImprimir = true;
      this.dataLoaded = false;

    }, () => {
      // error
      this.messageService.add({
        severity: 'error', summary: 'Error de conexión',
        detail: `En este momento no podemos establecer conexión con nuestros servidores, 
        revise su conexión a internet, recargue la pagina e intente generar su reporte de nuevo.
        `
      });
      // this.dataLoaded = false;
      // setTimeout(() => {
      //   this.index = 0;
      //   setTimeout(() => {
      //     this.step1 = false;
      //     this.step2 = false;
      //     this.step3 = false;
      //     this.step4 = false;
      //   }, 100);
      // }, 2000);

    });

  }

  enviarCorreo() {
    // const yals_req: YalsRequest = this.avaluoForm;
    // yals_req.id_tipo_propiedad = (+yals_req.id_tipo_propiedad);
    // yals_req.recamaras = (+yals_req.recamaras);
    // yals_req.banos = (+yals_req.banos);
    // yals_req.medios_banos = (+yals_req.medios_banos);
    // yals_req.estacionamientos = (+yals_req.estacionamientos);
    // yals_req.area_construida = (+yals_req.area_construida);
    // yals_req.superficie_terreno = (+yals_req.superficie_terreno);
    // yals_req.edad = (+yals_req.edad);



    const HTMLFacturacion: any = document.getElementById("facturacion");
    // this.loading = true;
    // this.yals.generateRequest(yals_req, null).subscribe(response => {
    //   this.avaluoResponse = response;
    //   if (!this.avaluoResponse.data.response.similares) {
    //     this.messageService.add({
    //       severity: 'error', summary: 'Datos Insuficientes',
    //       detail: `No se han encontrado datos suficientes de la propiedad para realizar un reporte detallado, 
    //       favor de ponerse en contacto con aclaraciones@valorinmuebles.com.mx
    //       `
    //     });
    //   }
    this.index = 4;

    //   this.messageService.add({
    //     severity: 'info', summary: 'Reporte',
    //     detail: `Se ha generado satisfactoriamente su reporte.`
    //   });
    //   setTimeout(() => {
    //     // this.imprimir();
    //     this.mostrarImprimir = true,
    //       setTimeout(() => {
    //       }, 15000);
    //   }, 2000);

    // }, () => {
    //   this.loading = false;
    //   this.messageService.add({
    //     severity: 'error', summary: 'Error procesando reporte',
    //     detail: `Se ha producido un error procesando su reporte, verifique los datos proporcionados 
    //     o su conexion a internet e intente nuevamente, en caso contrario porfavor contacte a soporte.`
    //   });
    // });
    if (this.isHidden) {
      // this.mail.sendMail({ to: "ventas@region4.mx", subject: "Facturacion", text: this.facturacion })
      //console.log(HTMLFacturacion.innerHTML);
      this.mail.sendMail({
        from: 'facturacion@valorinmuebles.mx',
        //to: "samuelherrerafuente@gmail.com", subject: "Facturacion",
        to: 'ventas@region4.mx', subject: 'Facturacion',
        //html: "<pre>" + JSON.stringify(this.facturacion, undefined, 2) + "</pre>"
        html: HTMLFacturacion.innerHTML
      })
        .subscribe(() => {
          this.messageService.add({
            severity: 'info', summary: 'Reporte',
            detail: `Se esta generando su factura, se la haremos llegar en un plazo maximo de 72horas.`
          });
        });
    }
  }

  imprimir() {
    this.loading = true;
    if (this.avaluoResponse.data.response.similares) {
      if (this.getMobileOperatingSystem() === 'iOS') {
        this.elementToPrint = document.getElementById('element-to-print-ios');
      } else {
        this.elementToPrint = document.getElementById('element-to-print');
      }

    } else {
      this.elementToPrint = document.getElementById('basic-element-to-print');
    }

    const datauri = html2pdf(this.elementToPrint, {
      margin: 0.4,
      filename: 'reporte.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 96, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
    datauri.then(data => {
      this.loading = false;
      localStorage.setItem('testObject', data);
      window.open('/download');
      // FileSaver.saveAs(this.b64toBlob(data.split(';base64,').pop(), 'application/pdf'), 'reporte.pdf');
    });
  }

  cambio(event) {
    this.step4 = event;
    setTimeout(() => {
      this.scrollIntoView('scrollhere');
      try {
        this.scrollIntoView('scrollhere');
      } catch (e) { }
    }, 1000);
  }


  enviarACorreo() {
    if (this.otroCorreo !== '') {
      if (this.avaluoResponse.data.response.similares) {
        if (this.getMobileOperatingSystem() === 'iOS') {
          this.elementToPrint = document.getElementById('element-to-print-ios');
        } else {
          this.elementToPrint = document.getElementById('element-to-print');
        }
      } else {
        this.elementToPrint = document.getElementById('basic-element-to-print');
      }
      const reportHTML: any = document.getElementById('reportTemplate');
      this.nomCliente['name'] = this.user.name;
      const datauri = html2pdf(this.elementToPrint, {
        margin: 0.4,
        filename: 'reporte.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { dpi: 96, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      });
      datauri.then(data => {
        this.yals.sendReport({
          from: 'ventas@valorinmuebles.com',
          to: this.otroCorreo,
          subject: 'Reporte de avalúo',
          text: ``,
          html: reportHTML.innerHTML,
          file: data.split(';base64,').pop()
        }).subscribe((response: any) => {
          console.log('Respuesta de mail: ', response);
          this.otroCorreo = '';
        });
      });



      this.messageService.add({
        severity: 'success', summary: 'Correo enviado',
        detail: 'Se a enviado el reporte a su correo.'
      });

    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error correo',
        detail: 'El correo no pudo ser enviado, verifiquee la direccion de correo introducida.'
      });
    }
  }

  nvoAvaluo() {
    location.reload();
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    let sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  scrollIntoView(eleID) {
    const e = document.getElementById(eleID);
    if (!!e && e.scrollIntoView) {
      e.scrollIntoView();
    }
  }

  getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }

    if (/android/i.test(userAgent)) {
      return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window['MSStream']) {
      return 'iOS';
    }

    return 'unknown';
  }

  // stepchanged(event: any) {
  // }

}

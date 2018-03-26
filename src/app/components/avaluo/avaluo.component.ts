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

    if (this.otroCorreo != "") {
      console.log(this.otroCorreo);
      this.mail.sendMail({
        from: "usuario@valorinmuebles.com.mx",
        to: this.otroCorreo,
        subject: "Reporte de avalúo",
        text: `<app-reporte _ngcontent-c3="" _nghost-c6="" ng-reflect-datos="[object Object]"><div _ngcontent-c6="" class="container" id="mainContainer">
        <div _ngcontent-c6="" class="scrollable">
      
          
          <div _ngcontent-c6="" class="superTitle">
            <div _ngcontent-c6="" class="superContainer">
              <a _ngcontent-c6="" href="#">
                <img _ngcontent-c6="" class="logo" src="assets/images/logo_.png">
              </a>
            </div>
          </div>
      
          <div _ngcontent-c6="" class="title">
            <div _ngcontent-c6="" class="titleContainer">
              <div _ngcontent-c6="" class="subTitleContainer">
                <span _ngcontent-c6="" class="principalTitle">REPORTE DEL INMUEBLE</span>
                <div _ngcontent-c6="" class="idReport">
                  <span _ngcontent-c6="" class="reportID">ID 5ab807f815a04b0798554656</span>
                  <span _ngcontent-c6="" class="generatedDate">Reporte generado el 2018-03-25T20:35:04.535Z
                    
                  </span>
                </div>
              </div>
            </div>
          </div>
      
          <div _ngcontent-c6="" class="characteristics">
            <div _ngcontent-c6="" class="middleTitle">
              <span _ngcontent-c6="">CARACTERÍSTICAS DE LA PROPIEDAD</span>
            </div>
            <div _ngcontent-c6="" class="address">
              <div _ngcontent-c6="" class="subAddress">
                <div _ngcontent-c6="" class="dir">
                  <div _ngcontent-c6="" class="littleTitle">
                    <span _ngcontent-c6="">DIRECCIÓN</span>
                  </div>
      
                  <div _ngcontent-c6="" class="direcContent">
                    <p _ngcontent-c6=""> Anzures, Calzada General Mariano Escobedo
                      No. Ext. 748
                      , No. Int s/n
                      
                    </p>
                    <p _ngcontent-c6="">C.P. 11590
                      
                    </p>
                    <p _ngcontent-c6=""> Ciudad de Mexico, Ciudad de Mexico
                      
                    </p>
                  </div>
      
                </div>
                <div _ngcontent-c6="" class="carac">
                  <div _ngcontent-c6="" class="littleTitle">
                    <span _ngcontent-c6="">CARACTERÍSTICAS</span>
                  </div>
      
                  <div _ngcontent-c6="" class="caracContainer">
                    <div _ngcontent-c6="" class="subCarac">
                      <div _ngcontent-c6="" class="imgContainer">
                        <img _ngcontent-c6="" alt="Smiley face" class="images" height="42" src="../assets/images/cuarto.png" width="42">
                      </div>
                      2 Cuartos
      
                    </div>
      
                    <div _ngcontent-c6="" class="subCarac">
                      <div _ngcontent-c6="" class="imgContainer">
                        <img _ngcontent-c6="" alt="Smiley face" class="images" height="42" src="../assets/images/bano.png" width="42">
                      </div>
                      1 Baños
      
                    </div>
      
                    <div _ngcontent-c6="" class="subCarac">
                      <div _ngcontent-c6="" class="imgContainer">
                        <img _ngcontent-c6="" alt="Smiley face" class="images" height="42" src="../assets/images/medio-bano.png" width="42">
                      </div>
                      1 Medios Baños
      
                    </div>
      
                    <div _ngcontent-c6="" class="subCarac">
                      <div _ngcontent-c6="" class="imgContainer">
                        <img _ngcontent-c6="" alt="Smiley face" class="images" height="42" src="../assets/images/parking.png" width="42">
                      </div>
                      1 Parking
      
                    </div>
      
                  </div>
                </div>
      
              </div>
      
              <div _ngcontent-c6="" class="amenidades">
                <div _ngcontent-c6="" class="littleTitle">AMENIDADES</div>
                <div _ngcontent-c6="" class="containerAmenidades">
      
                  <!--bindings={
        "ng-reflect-ng-for-of": "amueblado,cuarto_servicio,estu"
      }--><div _ngcontent-c6="" class="subamenidades ng-star-inserted">
      
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "true"
      }--><div _ngcontent-c6="" class="imgContainer ng-star-inserted">
                      <img _ngcontent-c6="" alt="Smiley face" class="images" height="42" src="../assets/images/amueblado.png" width="42">
                    </div>
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
      
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "true"
      }--><span _ngcontent-c6="" class="ng-star-inserted">Amueblado</span>
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                  </div><div _ngcontent-c6="" class="subamenidades ng-star-inserted">
      
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "true"
      }--><div _ngcontent-c6="" class="imgContainer ng-star-inserted">
                      <img _ngcontent-c6="" alt="Smiley face" class="images" height="42" src="../assets/images/lavado.png" width="42">
                    </div>
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
      
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "true"
      }--><span _ngcontent-c6="" class="ng-star-inserted">Cuarto de Servicio</span>
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                  </div><div _ngcontent-c6="" class="subamenidades ng-star-inserted">
      
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "true"
      }--><div _ngcontent-c6="" class="imgContainer ng-star-inserted">
                      <img _ngcontent-c6="" alt="Smiley face" class="images" height="42" src="../assets/images/estudio.png" width="42">
                    </div>
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
      
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "true"
      }--><span _ngcontent-c6="" class="ng-star-inserted">Estudio</span>
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                  </div><div _ngcontent-c6="" class="subamenidades ng-star-inserted">
      
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "true"
      }--><div _ngcontent-c6="" class="imgContainer ng-star-inserted">
                      <img _ngcontent-c6="" alt="Smiley face" class="images" height="42" src="../assets/images/seguridad.png" width="42">
                    </div>
      
                    <!--bindings={
        "ng-reflect-ng-if": "true"
      }--><span _ngcontent-c6="" class="ng-star-inserted">seguridad</span>
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                    <!--bindings={
        "ng-reflect-ng-if": "false"
      }-->
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div _ngcontent-c6="" class="divisor">
            <hr _ngcontent-c6="">
          </div>
      
          <div _ngcontent-c6="" class="estimatedValue">
      
            <div _ngcontent-c6="" class="middleTitle">
              <span _ngcontent-c6="">ESTIMADO DE VALOR EN 2018-03-25T20:35:04.535Z</span>
            </div>
      
            <div _ngcontent-c6="" class="prices">
              <div _ngcontent-c6="" class="totalEstimated">
                <div _ngcontent-c6="" class="estimated1">
                  <h3 _ngcontent-c6="">Estimado del valor total</h3>
      
                  <h4 _ngcontent-c6="">$
                    5,496,279.45</h4>
                  <p _ngcontent-c6="">Estimado de valor total*</p>
                </div>
      
                <div _ngcontent-c6="" class="estimated2">
                  <div _ngcontent-c6="" class="inferior">
                    <h4 _ngcontent-c6="">$
                      4,763,796.97</h4>
                    <p _ngcontent-c6="">Limite inferior</p>
                  </div>
                  <div _ngcontent-c6="" class="superior">
                    <h4 _ngcontent-c6="">$
                      6,744,652.7</h4>
                    <p _ngcontent-c6="">Limite Superior</p>
                  </div>
                </div>
      
                <div _ngcontent-c6="" class="subText">
                  <p _ngcontent-c6="">
                    *Estimación calibrada con información de precios de oferta
                  </p>
                </div>
      
              </div>
              <div _ngcontent-c6="" class="html2pdf__page-break"></div>
              <div _ngcontent-c6="" class="mEstimated">
      
                <div _ngcontent-c6="" class="mEstimated1">
                  <h3 _ngcontent-c6="">Estimado del valor por m2</h3>
      
                  <h4 _ngcontent-c6="">$
                    54,962.79</h4>
                  <p _ngcontent-c6="">Estimado de valor por m2*</p>
                </div>
      
                <div _ngcontent-c6="" class="mEstimated2">
                  <div _ngcontent-c6="" class="mInferior">
                    <h4 _ngcontent-c6="">$
                      47,637.97</h4>
                    <p _ngcontent-c6="">Limite inferior</p>
                  </div>
                  <div _ngcontent-c6="" class="mSuperior">
                    <h4 _ngcontent-c6="">$
                      67,446.53 </h4>
                    <p _ngcontent-c6="">Limite Superior</p>
                  </div>
                </div>
      
              </div>
            </div>
      
            <div _ngcontent-c6="" class="mapView">
              <div _ngcontent-c6="" class="houseView">
                <img _ngcontent-c6="" src="data:image/jpeg;base64,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">
              </div>
              <div _ngcontent-c6="" class="map">
                <img _ngcontent-c6="" src="data:image/jpeg;base64,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">
                
              </div>
            </div>
      
            <div _ngcontent-c6="" class="intro">
              <h2 _ngcontent-c6="">*Foto aproximada de la fachada y ubicación de inmueble proporcionado por Google.</h2>
              <h3 _ngcontent-c6=""></h3>
              <p _ngcontent-c6="">
                El reporte de tu inmueble de Región4 se construye a partir de nuestros modelos de valuación automática, los cuales nos permiten
                dar referencias de valor para tu propiedad de manera instantánea. Los modelos y algoritmos utilizados por Región4
                se alimentan de los precios de millones de ofertas y cierres de transacciones. Región4 provee un estimado de valor
                y no sustituye aun avalúo certificado.
              </p>
            </div>
      
      
      
          </div>
      
          <div _ngcontent-c6="" class="divisor">
            <hr _ngcontent-c6="">
          </div>
      
          <div _ngcontent-c6="" class="html2pdf__page-break"></div>
      
          <div _ngcontent-c6="" class="propiedades">
      
            <div _ngcontent-c6="" class="middleTitle">
              <span _ngcontent-c6="">PROPIEDADES COMPARABLES</span>
            </div>
      
            <div _ngcontent-c6="" class="intro">
              <h2 _ngcontent-c6="">Esta sección muestra propiedades similares a la tuya que fueron anunciadas en los últimos 6 meses.</h2>
              <h3 _ngcontent-c6=""></h3>
              <p _ngcontent-c6=""> Acontinuación proveemos información sobre ofertas de propiedades comparables con la tuya.
                <br _ngcontent-c6=""> Están ordenadas utilizando una medida de similitud que toma en cuenta las características de cada propiedad. </p>
      
            </div>
      
            
      
            <div _ngcontent-c6="" class="table">
              <div _ngcontent-c6="" class="example-container ">
                
                <mat-table _ngcontent-c6="" class="mat-table" matsort="" role="grid" ng-reflect-data-source="[object Object]"><!----><mat-header-row _ngcontent-c6="" class="mat-header-row ng-star-inserted" role="row"><!----><mat-header-cell _ngcontent-c6="" class="headerCell mat-header-cell cdk-column-position mat-column-position ng-star-inserted" mat-sort-header="" role="columnheader"> No. </mat-header-cell><mat-header-cell _ngcontent-c6="" class="headerCell mat-header-cell cdk-column-oferta mat-column-oferta ng-star-inserted" mat-sort-header="" role="columnheader"> Oferta </mat-header-cell><mat-header-cell _ngcontent-c6="" class="headerCell mat-header-cell cdk-column-total mat-column-total ng-star-inserted" mat-sort-header="" role="columnheader"> $ Total </mat-header-cell><mat-header-cell _ngcontent-c6="" class="headerCell mat-header-cell cdk-column-m2 mat-column-m2 ng-star-inserted" mat-sort-header="" role="columnheader"> $ m2 </mat-header-cell><mat-header-cell _ngcontent-c6="" class="headerCell mat-header-cell cdk-column-cuartos mat-column-cuartos ng-star-inserted" mat-sort-header="" role="columnheader"> No. Cuartos </mat-header-cell><mat-header-cell _ngcontent-c6="" class="headerCell mat-header-cell cdk-column-banos mat-column-banos ng-star-inserted" mat-sort-header="" role="columnheader"> No. Baños </mat-header-cell><mat-header-cell _ngcontent-c6="" class="headerCell mat-header-cell cdk-column-parking mat-column-parking ng-star-inserted" mat-sort-header="" role="columnheader"> No. Parking </mat-header-cell><mat-header-cell _ngcontent-c6="" class="headerCell mat-header-cell cdk-column-construccion mat-column-construccion ng-star-inserted" mat-sort-header="" role="columnheader"> Construccion </mat-header-cell><mat-header-cell _ngcontent-c6="" class="headerCell mat-header-cell cdk-column-edad mat-column-edad ng-star-inserted" mat-sort-header="" role="columnheader"> Edad </mat-header-cell><mat-header-cell _ngcontent-c6="" class="headerCell mat-header-cell cdk-column-distancia mat-column-distancia ng-star-inserted" mat-sort-header="" role="columnheader"> Distancia </mat-header-cell><mat-header-cell _ngcontent-c6="" class="headerCell mat-header-cell cdk-column-similitud mat-column-similitud ng-star-inserted" mat-sort-header="" role="columnheader"> % Similitud </mat-header-cell></mat-header-row><!----><mat-row _ngcontent-c6="" class="mat-row ng-star-inserted" role="row"><!----><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-position mat-column-position ng-star-inserted" role="gridcell"> 69-12-31 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-oferta mat-column-oferta ng-star-inserted" role="gridcell"> 11/02/2018 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-total mat-column-total ng-star-inserted" role="gridcell">5,380,000.0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-m2 mat-column-m2 ng-star-inserted" role="gridcell"> 0.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-cuartos mat-column-cuartos ng-star-inserted" role="gridcell"> 2 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-banos mat-column-banos ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-parking mat-column-parking ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-construccion mat-column-construccion ng-star-inserted" role="gridcell"> 83.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-edad mat-column-edad ng-star-inserted" role="gridcell"> 0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-distancia mat-column-distancia ng-star-inserted" role="gridcell"> 560.16 Km</mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-similitud mat-column-similitud ng-star-inserted" role="gridcell"> 82.9 %</mat-cell></mat-row><mat-row _ngcontent-c6="" class="mat-row ng-star-inserted" role="row"><!----><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-position mat-column-position ng-star-inserted" role="gridcell"> 69-12-31 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-oferta mat-column-oferta ng-star-inserted" role="gridcell"> 26/09/2017 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-total mat-column-total ng-star-inserted" role="gridcell">5,650,000.0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-m2 mat-column-m2 ng-star-inserted" role="gridcell"> 0.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-cuartos mat-column-cuartos ng-star-inserted" role="gridcell"> 2 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-banos mat-column-banos ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-parking mat-column-parking ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-construccion mat-column-construccion ng-star-inserted" role="gridcell"> 82.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-edad mat-column-edad ng-star-inserted" role="gridcell"> 0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-distancia mat-column-distancia ng-star-inserted" role="gridcell"> 560.16 Km</mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-similitud mat-column-similitud ng-star-inserted" role="gridcell"> 82.58 %</mat-cell></mat-row><mat-row _ngcontent-c6="" class="mat-row ng-star-inserted" role="row"><!----><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-position mat-column-position ng-star-inserted" role="gridcell"> 69-12-31 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-oferta mat-column-oferta ng-star-inserted" role="gridcell"> 23/02/2018 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-total mat-column-total ng-star-inserted" role="gridcell">5,280,000.0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-m2 mat-column-m2 ng-star-inserted" role="gridcell"> 0.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-cuartos mat-column-cuartos ng-star-inserted" role="gridcell"> 2 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-banos mat-column-banos ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-parking mat-column-parking ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-construccion mat-column-construccion ng-star-inserted" role="gridcell"> 82.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-edad mat-column-edad ng-star-inserted" role="gridcell"> 0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-distancia mat-column-distancia ng-star-inserted" role="gridcell"> 560.16 Km</mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-similitud mat-column-similitud ng-star-inserted" role="gridcell"> 82.58 %</mat-cell></mat-row><mat-row _ngcontent-c6="" class="mat-row ng-star-inserted" role="row"><!----><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-position mat-column-position ng-star-inserted" role="gridcell"> 69-12-31 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-oferta mat-column-oferta ng-star-inserted" role="gridcell"> 17/03/2018 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-total mat-column-total ng-star-inserted" role="gridcell">5,280,000.0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-m2 mat-column-m2 ng-star-inserted" role="gridcell"> 0.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-cuartos mat-column-cuartos ng-star-inserted" role="gridcell"> 2 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-banos mat-column-banos ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-parking mat-column-parking ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-construccion mat-column-construccion ng-star-inserted" role="gridcell"> 82.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-edad mat-column-edad ng-star-inserted" role="gridcell"> 0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-distancia mat-column-distancia ng-star-inserted" role="gridcell"> 560.16 Km</mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-similitud mat-column-similitud ng-star-inserted" role="gridcell"> 82.58 %</mat-cell></mat-row><mat-row _ngcontent-c6="" class="mat-row ng-star-inserted" role="row"><!----><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-position mat-column-position ng-star-inserted" role="gridcell"> 69-12-31 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-oferta mat-column-oferta ng-star-inserted" role="gridcell"> 03/02/2018 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-total mat-column-total ng-star-inserted" role="gridcell">5,390,000.0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-m2 mat-column-m2 ng-star-inserted" role="gridcell"> 0.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-cuartos mat-column-cuartos ng-star-inserted" role="gridcell"> 2 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-banos mat-column-banos ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-parking mat-column-parking ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-construccion mat-column-construccion ng-star-inserted" role="gridcell"> 82.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-edad mat-column-edad ng-star-inserted" role="gridcell"> 0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-distancia mat-column-distancia ng-star-inserted" role="gridcell"> 560.16 Km</mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-similitud mat-column-similitud ng-star-inserted" role="gridcell"> 82.58 %</mat-cell></mat-row><mat-row _ngcontent-c6="" class="mat-row ng-star-inserted" role="row"><!----><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-position mat-column-position ng-star-inserted" role="gridcell"> 69-12-31 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-oferta mat-column-oferta ng-star-inserted" role="gridcell"> 12/01/2018 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-total mat-column-total ng-star-inserted" role="gridcell">5,390,000.0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-m2 mat-column-m2 ng-star-inserted" role="gridcell"> 0.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-cuartos mat-column-cuartos ng-star-inserted" role="gridcell"> 2 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-banos mat-column-banos ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-parking mat-column-parking ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-construccion mat-column-construccion ng-star-inserted" role="gridcell"> 82.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-edad mat-column-edad ng-star-inserted" role="gridcell"> 0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-distancia mat-column-distancia ng-star-inserted" role="gridcell"> 560.16 Km</mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-similitud mat-column-similitud ng-star-inserted" role="gridcell"> 82.58 %</mat-cell></mat-row><mat-row _ngcontent-c6="" class="mat-row ng-star-inserted" role="row"><!----><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-position mat-column-position ng-star-inserted" role="gridcell"> 69-12-31 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-oferta mat-column-oferta ng-star-inserted" role="gridcell"> 12/10/2017 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-total mat-column-total ng-star-inserted" role="gridcell">5,690,000.0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-m2 mat-column-m2 ng-star-inserted" role="gridcell"> 0.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-cuartos mat-column-cuartos ng-star-inserted" role="gridcell"> 2 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-banos mat-column-banos ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-parking mat-column-parking ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-construccion mat-column-construccion ng-star-inserted" role="gridcell"> 82.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-edad mat-column-edad ng-star-inserted" role="gridcell"> 0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-distancia mat-column-distancia ng-star-inserted" role="gridcell"> 566.36 Km</mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-similitud mat-column-similitud ng-star-inserted" role="gridcell"> 82.29 %</mat-cell></mat-row><mat-row _ngcontent-c6="" class="mat-row ng-star-inserted" role="row"><!----><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-position mat-column-position ng-star-inserted" role="gridcell"> 69-12-31 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-oferta mat-column-oferta ng-star-inserted" role="gridcell"> 08/11/2017 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-total mat-column-total ng-star-inserted" role="gridcell">5,600,000.0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-m2 mat-column-m2 ng-star-inserted" role="gridcell"> 0.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-cuartos mat-column-cuartos ng-star-inserted" role="gridcell"> 2 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-banos mat-column-banos ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-parking mat-column-parking ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-construccion mat-column-construccion ng-star-inserted" role="gridcell"> 82.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-edad mat-column-edad ng-star-inserted" role="gridcell"> 0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-distancia mat-column-distancia ng-star-inserted" role="gridcell"> 566.36 Km</mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-similitud mat-column-similitud ng-star-inserted" role="gridcell"> 82.29 %</mat-cell></mat-row><mat-row _ngcontent-c6="" class="mat-row ng-star-inserted" role="row"><!----><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-position mat-column-position ng-star-inserted" role="gridcell"> 69-12-31 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-oferta mat-column-oferta ng-star-inserted" role="gridcell"> 26/09/2017 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-total mat-column-total ng-star-inserted" role="gridcell">5,450,000.0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-m2 mat-column-m2 ng-star-inserted" role="gridcell"> 0.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-cuartos mat-column-cuartos ng-star-inserted" role="gridcell"> 2 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-banos mat-column-banos ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-parking mat-column-parking ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-construccion mat-column-construccion ng-star-inserted" role="gridcell"> 91.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-edad mat-column-edad ng-star-inserted" role="gridcell"> 0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-distancia mat-column-distancia ng-star-inserted" role="gridcell"> 893.89 Km</mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-similitud mat-column-similitud ng-star-inserted" role="gridcell"> 71.35 %</mat-cell></mat-row><mat-row _ngcontent-c6="" class="mat-row ng-star-inserted" role="row"><!----><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-position mat-column-position ng-star-inserted" role="gridcell"> 69-12-31 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-oferta mat-column-oferta ng-star-inserted" role="gridcell"> 24/01/2018 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell2 mat-cell cdk-column-total mat-column-total ng-star-inserted" role="gridcell">2,980,000.0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-m2 mat-column-m2 ng-star-inserted" role="gridcell"> 0.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-cuartos mat-column-cuartos ng-star-inserted" role="gridcell"> 2 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-banos mat-column-banos ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-parking mat-column-parking ng-star-inserted" role="gridcell"> 1 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-construccion mat-column-construccion ng-star-inserted" role="gridcell"> 80.0 m
                      <sup _ngcontent-c6="">2</sup>
                    </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-edad mat-column-edad ng-star-inserted" role="gridcell"> 0 </mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-distancia mat-column-distancia ng-star-inserted" role="gridcell"> 1,025.29 Km</mat-cell><mat-cell _ngcontent-c6="" class="containerCell mat-cell cdk-column-similitud mat-column-similitud ng-star-inserted" role="gridcell"> 61.53 %</mat-cell></mat-row></mat-table>
              </div>
      
            </div>
          </div>
      
          <div _ngcontent-c6="" class="divisor">
            <hr _ngcontent-c6="">
          </div>
      
          <div _ngcontent-c6="" class="html2pdf__page-break"></div>
      
          <div _ngcontent-c6="" class="preciosColonia">
            <div _ngcontent-c6="" class="middleTitle">
              <span _ngcontent-c6="">COLONIA Anzures</span>
            </div>
      
            <div _ngcontent-c6="" class="intro">
              <h2 _ngcontent-c6="">Esta sección te ayudará a conocer los precios en la colonia, el tipo de vivienda que existe y el número de listados
                mensuales.
              </h2>
              <h3 _ngcontent-c6="">Oferta en los últimos meses</h3>
              <p _ngcontent-c6="">A continuación se muestra un número aproximado de cuántas casas y departamentos han sido listados en portales de
                Internet.
              </p>
            </div>
      
            <div _ngcontent-c6="" class="ofertasMes">
      
              <div _ngcontent-c6="" class="ultimoMes">
      
                <div _ngcontent-c6="" class="umesContainer">
      
                  <div _ngcontent-c6="" class="calendarContainer">
                    <img _ngcontent-c6="" alt="Smiley face" src="../assets/images/calendary.png">
                  </div>
                  <div _ngcontent-c6="" class="numCasas">
                    <h1 _ngcontent-c6="">30
                      
                    </h1>
                    <p _ngcontent-c6="">Casas y departamentos listados en el último mes</p>
                  </div>
                </div>
                <div _ngcontent-c6="" class="tablaMes">
      
                  <table _ngcontent-c6="">
                    <tbody _ngcontent-c6=""><tr _ngcontent-c6="">
                      <th _ngcontent-c6="" class="titleTable" colspan="2">
                        Precios promedios de oferta en la colonia Anzures
                      </th>
                    </tr>
      
                    <tr _ngcontent-c6="">
                      <td _ngcontent-c6="" class="promedioTotal">$
                        9,749,360.38</td>
                      <td _ngcontent-c6="" class="promediom2">
                        46,201.61</td>
                    </tr>
                    <tr _ngcontent-c6="">
                      <td _ngcontent-c6="" class="txtPromedio">Total Promedio</td>
                      <td _ngcontent-c6="" class="txtPromedio">Promedio m2</td>
                    </tr>
      
                  </tbody></table>
                </div>
      
              </div>
      
              <div _ngcontent-c6="" class="seisMeses">
      
                <div _ngcontent-c6="" class="smesContainer">
      
                  <div _ngcontent-c6="" class="calendarContainer">
                    <img _ngcontent-c6="" alt="Smiley face" src="../assets/images/calendary.png">
                  </div>
                  <div _ngcontent-c6="" class="numCasas">
                    <h1 _ngcontent-c6="">
                      228</h1>
                    <p _ngcontent-c6="">Casas y departamentos listados en los últimos 6 meses</p>
                  </div>
                </div>
      
                <div _ngcontent-c6="" class="tablaMes">
                  <table _ngcontent-c6="">
                    <tbody _ngcontent-c6=""><tr _ngcontent-c6="">
                      <th _ngcontent-c6="" class="titleTable" colspan="2">
                        Información de cierres
                      </th>
                    </tr>
      
                    <tr _ngcontent-c6="">
                      <td _ngcontent-c6="" class="promediom2">
                        $5,402,008.0</td>
                      <td _ngcontent-c6="" class="promediom2">
                        $39,580.85</td>
                    </tr>
                    <tr _ngcontent-c6="">
                      <td _ngcontent-c6="" class="txtPromedio">Total Promedio</td>
                      <td _ngcontent-c6="" class="txtPromedio">Promedio m2</td>
                    </tr>
      
                  </tbody></table>
                </div>
      
              </div>
      
            </div>
      
          </div>
      
          <div _ngcontent-c6="" class="divisor">
            <hr _ngcontent-c6="">
          </div>
          
      
          
          
          <div _ngcontent-c6="" class="graficaPrecioColonia">
            <div _ngcontent-c6="" class="containerGraficaColonia">
      
              <div _ngcontent-c6="" class="intro3">
                <h3 _ngcontent-c6="">Precios promedio de oferta en la colonia Anzures</h3>
              </div>
              <div _ngcontent-c6="" class="graficaContainer" id="graficaColonia">
                <p-chart _ngcontent-c6="" type="bar" ng-reflect-type="bar" ng-reflect-data="[object Object]">
              <div style="position:relative"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                  <canvas style="display: block; width: 650px; height: 325px;" height="325" class="chartjs-render-monitor" width="650"></canvas>
              </div>
          </p-chart>
              </div>
      
            </div>
          </div>
      
          <div _ngcontent-c6="" class="html2pdf__page-break"></div>
      
          <div _ngcontent-c6="" class="graficaDescripciones">
      
            <div _ngcontent-c6="" class="propiedadesEdad">
      
              <div _ngcontent-c6="" class="propiedadPreciom2">
                <div _ngcontent-c6="" class="grafica1Container">
                  <div _ngcontent-c6="" class="intro">
                    <h3 _ngcontent-c6=""> Propiedades según precio por m
                      <sup _ngcontent-c6="">2</sup>
                    </h3>
                    <p _ngcontent-c6="">La gráfica muestra el porcentaje de las ofertas en la colonia ordenadas por rango de precios (casas y departamentos
                      listados en los últimos 6 meses).</p>
                  </div>
                  <div _ngcontent-c6="" class="graficaContainer1" id="graficaPropiedadM2">
                    <p-chart _ngcontent-c6="" type="bar" ng-reflect-type="bar" ng-reflect-data="[object Object]">
              <div style="position:relative"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                  <canvas style="display: block; width: 310px; height: 155px;" height="155" class="chartjs-render-monitor" width="310"></canvas>
              </div>
          </p-chart>
                  </div>
                </div>
              </div>
      
              <div _ngcontent-c6="" class="edadVivienda">
                <div _ngcontent-c6="" class="grafica2Container">
                  <div _ngcontent-c6="" class="intro">
                    <h3 _ngcontent-c6=""> Edad y tipo de vivienda
                    </h3>
                    <p _ngcontent-c6="">
                      La gráfica muestra el porcentaje de ofertas en la colonia según su edad.</p>
                  </div>
                  <div _ngcontent-c6="" class="graficaContainer2" id="graficaDatosVivienda">
                    <p-chart _ngcontent-c6="" type="bar" ng-reflect-type="bar" ng-reflect-data="[object Object]">
              <div style="position:relative"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                  <canvas style="display: block; width: 310px; height: 155px;" height="155" class="chartjs-render-monitor" width="310"></canvas>
              </div>
          </p-chart>
                  </div>
                </div>
              </div>
      
            </div>
      
            <div _ngcontent-c6="" class="recamarasSuperficie">
      
              <div _ngcontent-c6="" class="numRecamaras">
                <div _ngcontent-c6="" class="grafica1Container">
                  <div _ngcontent-c6="" class="intro">
                    <h3 _ngcontent-c6=""> Número de recámaras
                    </h3>
                    <p _ngcontent-c6="">
                      La gráfica muestra el número de departamentos según su edad y número de recámaras (dormitorios).</p>
                  </div>
                  <div _ngcontent-c6="" class="graficaContainer1" id="graficaRecamaras">
                    <p-chart _ngcontent-c6="" type="bar" ng-reflect-type="bar" ng-reflect-data="[object Object]">
              <div style="position:relative"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                  <canvas style="display: block; width: 310px; height: 155px;" height="155" class="chartjs-render-monitor" width="310"></canvas>
              </div>
          </p-chart>
                  </div>
                </div>
              </div>
      
              <div _ngcontent-c6="" class="html2pdf__page-break"></div>
      
              <div _ngcontent-c6="" class="superficieConstruida">
                <div _ngcontent-c6="" class="grafica2Container">
                  <div _ngcontent-c6="" class="intro">
                    <h3 _ngcontent-c6="">
                      Supercie construida
                    </h3>
                    <p _ngcontent-c6="">
                      La gráfica muestra el número de departamentos según su edad y supercie construida.
                    </p>
                  </div>
                  <div _ngcontent-c6="" class="graficaContainer2" id="graficaSuperficie">
                    <p-chart _ngcontent-c6="" type="bar" ng-reflect-type="bar" ng-reflect-data="[object Object]">
              <div style="position:relative"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                  <canvas style="display: block; width: 310px; height: 155px;" height="155" class="chartjs-render-monitor" width="310"></canvas>
              </div>
          </p-chart>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div _ngcontent-c6="" class="divisor">
            <hr _ngcontent-c6="">
          </div>
          
      
          <div _ngcontent-c6="" class="evolucionColonia">
            <div _ngcontent-c6="" class="middleTitle">
              <span _ngcontent-c6="">EVOLUCIÓN DE LOS PRECIOS EN LA COLONIA</span>
            </div>
      
            <div _ngcontent-c6="" class="intro">
              <h2 _ngcontent-c6="">
                A continuación te ofrecemos datos que muestran la variación de precios en la colonia.
              </h2>
      
              <h3 _ngcontent-c6="">
                Precio histórico por m2
              </h3>
              <p _ngcontent-c6="">
                Esta sección muestra el comportamiento histórico del valor estimado de la propiedad en cuestión comparado con el cambio en
                los precios en la colonia a través del tiempo.
                <br _ngcontent-c6=""> La siguiente gráfica muestra el valor estimado de la propiedad a través de los años (antes de la fecha de generación
                del reporte). Esta información está basada en una valuación automática que utiliza los datos históricos disponibles
                de propiedades similares en la misma colonia.
                <br _ngcontent-c6=""> Una vez obtenida la información, ésta se compara con el desempeño del mercado local usando la base de datos de
                Región4.
              </p>
      
            </div>
            <div _ngcontent-c6="" class="plusValia">
              <div _ngcontent-c6="" class="flechaContainer">
                <img _ngcontent-c6="" alt="Smiley face" src="../assets/images/flecha.png">
              </div>
              <div _ngcontent-c6="" class="plusValiaContainer">
                <h2 _ngcontent-c6="">
                  +11.37%
                </h2>
                <p _ngcontent-c6="">
                  Plusvalía anualizada
                </p>
              </div>
            </div>
      
          </div>
      
          <div _ngcontent-c6="" class="divisor">
            <hr _ngcontent-c6="">
          </div>
          <div _ngcontent-c6="" class="html2pdf__page-break"></div>
      
          <div _ngcontent-c6="" class="glosario">
            <div _ngcontent-c6="" class="middleTitle">
              <span _ngcontent-c6="">GLOSARIO</span>
            </div>
            <div _ngcontent-c6="" class="glosarioContainer">
      
              <div _ngcontent-c6="" class="rightText">
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Apreciación</h3>
                  <p _ngcontent-c6="">Cambio positivo en el precio del inmueble comparado con un periodo base (enero 2014). El cálculo se hace con
                    el modelo de valuación automática de Región4. El cálculo no toma en cuenta inflación.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Avalúo</h3>
                  <p _ngcontent-c6="">Un avalúo corresponde a la valoración comercial de un bien raíz. Generalmente es un documento elaborado por un
                    valuador profesional, agente de la propiedad inmobiliaria o corredor de propiedades. Además de la valoración
                    comercial, contiene información sobre el avalúo fiscal, los títulos de dominio, así como la contribución, ubicación,
                    tamaño, calidad de construcción y vida útil de la edificación.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Condición</h3>
                  <p _ngcontent-c6="">
                    Nueva o usada. La vivienda nueva es la que tiene menos de un año de construida o remodelada. La usada tiene más Fde un año.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Fecha de oferta</h3>
                  <p _ngcontent-c6="">Fecha de publicación de la oferta de venta de un inmueble en un portal de Internet.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Información de cierres</h3>
                  <p _ngcontent-c6="">Precios de propiedad es que cuentan con un avalúo certificado y un crédito hipotecario asociado. Se toma el precio
                    de cierre como el valor del inmueble.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Límite inferior y superior</h3>
                  <p _ngcontent-c6="">Rangos de valor mínimo y máximo construidos a partir de un intervalo de confianza estadística.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Modelo de Valuación Automática</h3>
                  <p _ngcontent-c6="">Modelo estadístico propietario de Región4 el cual toma en cuenta las características de la vivienda (ubicación,
                    superficie, tipología, edad, etc.), los precios de cierre y precios de oferta de propiedades similares, para
                    construir una estimación del precio de mercado del inmueble.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Precio oferta</h3>
                  <p _ngcontent-c6="">Precio al que se ofrece una propiedad en un sitio de listados en Internet.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Propiedades</h3>
                  <p _ngcontent-c6="">Casas o departamentos para uso residencial.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Propiedades listadas</h3>
                  <p _ngcontent-c6="">Propiedades que aparecen en sitios de ofertas en Internet.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Similitud</h3>
                  <p _ngcontent-c6="">Medida de similitud entre dos propiedades. Se construye con un modelo estadístico propietario de Región4. La
                    similitud va del 0 al 100%, donde 100% equivale a dos propiedades exactamente iguales.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Superficie de construcción</h3>
                  <p _ngcontent-c6="">Superficie habitable de la residencia, no considera terrazas, estacionamientos o jardines.</p>
                </div>
      
                <div _ngcontent-c6="" class="intro2">
                  <h3 _ngcontent-c6="">Superficie de terreno</h3>
                  <p _ngcontent-c6="">Superficie total de la propiedad, toma en cuenta terrazas, estacionamientos y jardines.</p>
                </div>
      
              </div>
            </div>
          </div>
      
          <div _ngcontent-c6="" class="divisor">
            <hr _ngcontent-c6="">
          </div>
          
          <div _ngcontent-c6="" class="terminos">
            <div _ngcontent-c6="" class="middleTitle">
              <span _ngcontent-c6="">TÉRMINOS Y CONDICIONES</span>
            </div>
      
            <div _ngcontent-c6="" class="contenido">
              <p _ngcontent-c6="">
                Región4 es un estimador del valor de propiedades residenciales.
                <br _ngcontent-c6="">
                <br _ngcontent-c6=""> Región4 provee una opinión de valor objetiva basada en millones de puntos de información sobre viviendas en México.
                Esto te permite obtener información para la toma de decisiones cuando compras, vendes o rentas un inmueble. Para
                saber más consulta www.region4.mx
                <br _ngcontent-c6="">
                <br _ngcontent-c6=""> El uso de este reporte está sujeto a los Términos y Condiciones sobre los que fue generado. Éstos indican que
                el usuario reconoce que el reporte fue generado sin la visita física a la propiedad analizada.
                <br _ngcontent-c6="">
                <br _ngcontent-c6=""> El reporte de Región4 constituye únicamente un estimado de valor. Derechos reservados Región4 Asesores Inmobiliarios
                S.C.P. 2017.
              </p>
            </div>
          </div>
      
        </div>
      
      </div></app-reporte>`
      }).subscribe((response: any) => {
        //console.log("Respuesta de mail: ",response);
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

  // stepchanged(event: any) {
  // }

}

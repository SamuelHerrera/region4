import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import { Element } from '@angular/compiler';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { YalsRequest } from '../../models/yals.model';
import { YalsService } from '../../services/yals.service';




@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit, OnChanges {

  displayedColumns = ['position', 'oferta', 'total', 'm2', 'cuartos', 'banos',
    'parking', 'construccion', 'edad', 'distancia', 'similitud'];
  ELEMENT_DATA: any[] = [
    {
      position: 1, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
      banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
    }

  ];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  @Input() datos = null;
  dat: any;
  estimatedDate = "ENERO 2016";
  idReport = 123;

  url: any;
  urlImage: any;

  //plusvalia = this.datos.data.response.historico.apreciacion_anualizada * 100;//"pending to implement"//14.2;
  plusvalia: any;
  /*lat = 30.200;
  lng = 20.100;*/
  lat: number;
  lng: number;

  /**Variables para las graficas */
  /**datos.data.request.colonia_preciosm2_general */
  datosPrecioColonia: any;
  datosPropiedadesM2: any;
  datosEdadVivienda: any;
  datosRecamaras: any;
  datosSuperficieConstruida: any;

  constructor(private yals: YalsService) {

  }

  ngOnInit() {
    this.yals.urlToBase64("https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=310x200&format=jpg&maptype=roadmap&markers=color:blue%7Clabel:S%7C" + this.lat + "," + this.lng + "&key=AIzaSyDV1v9VqdOKgnwilfhA25PqEFRoSNjHXAQ")
      .subscribe((response: any) => {
        this.url = "data:image/jpeg;base64," + response.data;
      });

    this.yals.urlToBase64("https://maps.googleapis.com/maps/api/streetview?size=310x200&format=jpg&location=" + this.lat + "," + this.lng + "&fov=90&heading=235&pitch=10&key=AIzaSyD-mZNHODP64wms0kiJCINVSyrgG5mht3w")
      .subscribe((response: any) => {
        this.urlImage = "data:image/jpeg;base64," + response.data;
      });
  }

  ngOnChanges(): void {

    this.plusvalia = (this.datos.data.response.historico.apreciacion_anualizada) * 100;
    console.log("Response", this.datos.data.request.amenities);
    if (this.datos) {



      this.lat = this.datos.data.request.latitud;
      this.lng = this.datos.data.request.longitud;
      //this.url = "https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=310x200&format=jpg&maptype=roadmap&markers=color:blue%7Clabel:S%7C"+this.lat+","+this.lng+"&key=AIzaSyDV1v9VqdOKgnwilfhA25PqEFRoSNjHXAQ" ;

      //this.url = this.getBase64ImageFromURL("file:///C:/Users/Erick%20Mex/Downloads/cat-1285634_640.png");/*"data:image/jpeg;base64,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";*/
      //this.urlImage = "https://maps.googleapis.com/maps/api/streetview?size=310x200&format=jpg&location="+this.lat+","+this.lng+"&fov=90&heading=235&pitch=10&key=AIzaSyD-mZNHODP64wms0kiJCINVSyrgG5mht3w";



      this.ELEMENT_DATA = [];
      let ind = 1;
      this.datos.data.response.similares.forEach(element => {
        /*let arr = element.precio_oferta.split(".");
        console.log("Arreglo: ",arr[0]);*/
        this.ELEMENT_DATA.push({
          position: ind,
          oferta: element.fecha_oferta,
          total: element.precio_oferta,
          m2: element.superficie_terreno,
          cuartos: element.recamaras,
          banos: element.banos,
          parking: element.estacionamientos,
          construccion: element.area_construida,
          edad: (element.edad || 0),
          distancia: element.distancia,
          //similitud: (element.similitud * 100) + '%'
          similitud: (element.similitud * 100)
        });
        ind++;
      });

      /**Graficas con datos obtenidos del json */
      //console.log("labels", this.datos.data.response.colonia_preciosm2_general.labels);
      this.datosPrecioColonia = {
        //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels: this.datos.data.response.colonia_preciosm2_general.labels,
        datasets: [
          {
            label: 'Precio Promedio Nuevo',
            backgroundColor: '#0000FF',
            borderColor: '#0080FF',
            //data: [65, 59, 80, 81, 56, 55, 40]
            data: this.datos.data.response.colonia_preciosm2_general.data.nuevo
          },
          {
            label: 'Precio Promedio Usado',
            backgroundColor: '#2E64FE',
            borderColor: '#0080FF',
            //data: [65, 59, 80, 81, 56, 55, 40]
            data: this.datos.data.response.colonia_preciosm2_general.data.usado
          }
        ]
      }
      /**grafica de precio propiedad por m2 */
      /** this.datos.data.response.colonia_preciosm2_especifica */
      this.datosPropiedadesM2 = {
        labels: this.datos.data.response.colonia_preciosm2_especifica.labels,
        //labels: ['35000', '40000', '50000', '50000+'],
        datasets: [
          {
            label: 'Nuevo',
            backgroundColor: '#82FA58',
            borderColor: '#74DF00',
            data: this.datos.data.response.colonia_preciosm2_especifica.data.nuevo
            //data: this.datos.data.response.colonia_preciosm2_general.labels.data.usado
          }, {
            label: 'Usado',
            backgroundColor: '#C8FE2E',
            borderColor: '#74DF00',
            data: this.datos.data.response.colonia_preciosm2_especifica.data.usado
            //data: this.datos.data.response.colonia_preciosm2_general.labels.data.usado
          }
        ]
      }

      /**Grafica edad y tipo de vivienda */
      /** */
      this.datosEdadVivienda = {
        labels: ['Casa', 'Departamento'],
        datasets: [
          {
            label: 'Nuevo',
            backgroundColor: '#82FA58',
            borderColor: '#74DF00',
            data: this.datos.data.response.colonia_tipos_propiedades.data.nuevo
            //data: this.datos.data.response.colonia_preciosm2_general.labels.data.usado
          }, {
            label: 'Usado',
            backgroundColor: '#C8FE2E',
            borderColor: '#74DF00',
            data: this.datos.data.response.colonia_tipos_propiedades.data.usado
            //data: this.datos.data.response.colonia_preciosm2_general.labels.data.usado
          }
        ]
      }

      /**Grafica numero de recamaras */
      /** this.datos.data.response.colonia_recamaras.labels --> .data.nuevo .data.usado */
      this.datosRecamaras = {
        //labels: this.datos.data.response.colonia_recamaras.labels,
        labels: ['1', '2', '3', '4+'],
        datasets: [
          {
            label: 'Nuevo',
            backgroundColor: '#82FA58',
            borderColor: '#74DF00',
            data: this.datos.data.response.colonia_recamaras.data.nuevo
            //data: this.datos.data.response.colonia_preciosm2_general.labels.data.usado
          }, {
            label: 'Usado',
            backgroundColor: '#C8FE2E',
            borderColor: '#74DF00',
            data: this.datos.data.response.colonia_recamaras.data.usado
            //data: this.datos.data.response.colonia_preciosm2_general.labels.data.usado
          }
        ]
      }

      /**Grafica superficie construida */
      /** this.datos.data.response.colonia_superficies.labels --> .data.nuevo .data.usado*/
      this.datosSuperficieConstruida = {
        //labels: this.datos.data.response.colonia_superficies.labels,
        labels: ['<60 m2', '60-120 m2', '120-200 m2', '>200 m2'],
        datasets: [
          {
            label: 'Nuevo',
            backgroundColor: '#82FA58',
            borderColor: '#74DF00',
            data: this.datos.data.response.colonia_superficies.data.nuevo
            //data: this.datos.data.response.colonia_preciosm2_general.labels.data.usado
          },
          {
            label: 'Usado',
            backgroundColor: '#C8FE2E',
            borderColor: '#74DF00',
            data: this.datos.data.response.colonia_superficies.data.usado
            //data: this.datos.data.response.colonia_preciosm2_general.labels.data.usado
          }
        ]
      }

      /**Fin graficas */

      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  imprimir() {
    const element = document.getElementById('element-to-print');
    console.log("Elementos a imprimir: ", element);
    html2pdf(element, {
      margin: 1,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  }

}
export interface Element {
  position: number;
  oferta: string;
  total: string;
  m2: string;
  cuartos: number;
  banos: number;
  parking: number;
  construccion: string;
  edad: number;
  distancia: string;
  similitud: string;
}


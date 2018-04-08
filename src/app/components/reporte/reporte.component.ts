import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import * as jsPDF from 'jspdf';
import * as html2pdf from '../../../assets/js/html2pdf';
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

  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  displayedColumns = ['position', 'oferta', 'total', 'm2', 'cuartos', 'banos',
    'parking', 'construccion', 'edad', 'distancia', 'similitud'];
  ELEMENT_DATA: any[] = [];
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
    this.yals.urlToBase64("https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=650x350&format=jpg&maptype=roadmap&markers=color:blue%7Clabel:S%7C" + this.lat + "," + this.lng + "&key=AIzaSyDV1v9VqdOKgnwilfhA25PqEFRoSNjHXAQ")
      .subscribe((response: any) => {
        this.url = "data:image/jpeg;base64," + response.data;
      });

    this.yals.urlToBase64("https://maps.googleapis.com/maps/api/streetview?size=650x350&format=jpg&location=" + this.lat + "," + this.lng + "&fov=90&heading=235&pitch=10&key=AIzaSyD-mZNHODP64wms0kiJCINVSyrgG5mht3w")
      .subscribe((response: any) => {
        this.urlImage = "data:image/jpeg;base64," + response.data;
      });
  }

  ngOnChanges(): void {

    if (this.datos.data.response.historico) {
      this.plusvalia = (this.datos.data.response.historico.apreciacion_anualizada) * 100;
    } else {
      this.plusvalia = false;
    }

    if (this.datos) {
      this.lat = this.datos.data.request.latitud;
      this.lng = this.datos.data.request.longitud;
      this.ELEMENT_DATA = [];
      let ind = 1;
      if (this.datos.data.response.similares) {
        this.datos.data.response.similares.forEach(element => {
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
            similitud: (element.similitud * 100)
          });
          ind++;
        });
      }

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
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      action: "save"
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


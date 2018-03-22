import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import { Element } from '@angular/compiler';




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

  plusvalia = "pending to implement"//14.2;

  lat = 30.200;
  lng = 20.100;

  /**Variables para las graficas */
  /**datos.data.request.colonia_preciosm2_general */
  datosPrecioColonia: any;
  datosPropiedadesM2: any;
  datosEdadVivienda: any;
  datosRecamaras: any;
  datosSuperficieConstruida: any;

  constructor() {

    

    
    if (this.datos) {

     /* this.datosPrecioColonia = {
        //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels: this.datos.data.response.colonia_preciosm2_general.labels,
        datasets: [
          {
            label: 'Precio Promedio',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            //data: [65, 59, 80, 81, 56, 55, 40]
            data: this.datos.data.response.colonia_preciosm2_general.data.usado
          }
        ]
      }*/

      

    }

  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    if (this.datos) {
      this.ELEMENT_DATA = [];
      let ind = 1;
      this.datos.data.response.similares.forEach(element => {
        this.ELEMENT_DATA.push({
          position: ind,
          oferta: element.fecha_oferta,
          total: '$' + element.precio_oferta,
          m2: element.superficie_terreno + "m2",
          cuartos: element.recamaras,
          banos: element.banos,
          parking: element.estacionamientos,
          construccion: element.area_construida + 'm2',
          edad: (element.edad || 0),
          distancia: element.distancia + ' km',
          similitud: (element.similitud * 100) + '%'
        });
        ind++;
      });

      /**Graficas con datos obtenidos del json */
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


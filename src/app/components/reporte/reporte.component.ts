import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';




@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  /**
   * Para llenar la tabla con datos
   */
  displayedColumns = ['position', 'oferta', 'total', 'm2', 'cuartos', 'banos',
    'parking', 'construccion', 'edad', 'distancia', 'similitud'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  /** */
  /**Llenar tabla de promedios */
  promedioTotal = "$6,895,041";
  promediom2 = "$43,462"
  cierrePromedioTotal = "$5,402,008";
  cierrePromediom2 = "$39,581";
  /** */
  generatedReport = "Dic 1993";
  estimatedDate = "ENERO 2016";
  idReport = 123;
  /*Datos Direccion*/
  colonia = "Bojorquez";
  codigoPostal = 9700;
  ciudad = "Mérida";
  estado = "Yucatán";
  numExt = "491B";
  numInt = "s/n";
  /* */

  /*Datos Contenido */
  numCuartos = 3;
  numBanos = 1;
  numMBanos = 0;
  numParking = 1;
  plusvalia = 14.2;
  /* */

  /*Ubicacion de casa maps */
  lat = 30.200;
  lng = 20.100;
  /* */

  /*Precios estimados */
  precioEstimado = "6,170,000";
  precioInferior = "5,153,00"
  precioSuperior = "7,670,000";

  precioEstimadoM2 = "61,700";
  precioMInferior = "51,500";
  precioMSuperior = "76,700";
  /** */
  /**Nombre de la colonia a comparar */
  nomColonia = "COLONIA ANZURES";
  uMesCasas = 31;
  sMesCasas = 293;
  /** */
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.imprimir();
    }, 5000);
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

const ELEMENT_DATA: Element[] = [
  {
    position: 1, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
  {
    position: 2, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
  {
    position: 3, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
  {
    position: 4, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
  {
    position: 5, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
  {
    position: 6, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
  {
    position: 7, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
  {
    position: 8, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
  {
    position: 9, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
  {
    position: 10, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
  {
    position: 11, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
  {
    position: 12, oferta: '17 Julio', total: '$6.2m', m2: '$61.7k', cuartos: 2,
    banos: 1, parking: 1, construccion: '100 m2', edad: 1, distancia: '1.23 km', similitud: '96.2%'
  },
];

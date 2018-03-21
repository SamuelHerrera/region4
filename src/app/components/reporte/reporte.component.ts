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

  constructor() { }

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


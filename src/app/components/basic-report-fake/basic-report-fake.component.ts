import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
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
import { ShortNumberPipe } from '../../pipes/short-number.pipe';
@Component({
  selector: 'app-basic-report-fake',
  templateUrl: './basic-report-fake.component.html',
  styleUrls: ['./basic-report-fake.component.css']
})
export class BasicReportFakeComponent implements OnInit, OnChanges, AfterViewInit {
  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  indexMonth: number;
  fechaCreacion: any;
  fechaConsulta: any;
  fechaSimilares: any;

  @ViewChild(MatSort) sort: MatSort;
  @Input() datos = null;
  dat: any;

  url: any = '';
  urlImage: any = '';
  /*lat = 30.200;
  lng = 20.100;*/
  lat: number;
  lng: number;

  constructor(private yals: YalsService) { }

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

    const fecha: any = (this.datos.data.dateCreated).split("-");
    this.indexMonth = parseInt(fecha[1]);
    const diaCreacion: any = fecha[2].split("T");
    this.fechaCreacion = diaCreacion[0] + " de " + this.months[this.indexMonth - 1] + " del " + fecha[0];
    this.fechaConsulta = this.months[this.indexMonth - 1] + " " + fecha[0];
    if (this.datos) {
      this.lat = this.datos.data.request.latitud;
      this.lng = this.datos.data.request.longitud;
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
  }


}

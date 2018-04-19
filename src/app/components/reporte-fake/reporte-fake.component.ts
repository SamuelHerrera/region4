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
  selector: 'app-reporte-fake',
  templateUrl: './reporte-fake.component.html',
  styleUrls: ['./reporte-fake.component.css']
})
export class ReporteFakeComponent implements OnInit, OnChanges, AfterViewInit {


  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  indexMonth: number;
  fechaCreacion: any;
  fechaConsulta: any;
  fechaSimilares: any;

  /**Para mostrar los datos de las gráficas */
  labelm2General: any = {};
  coloniam2General: any[] = [];
  /** */

  displayedColumns = ['position', 'oferta', 'total', 'm2', 'cuartos', 'banos',
    'parking', 'construccion', 'edad', 'distancia', 'similitud'];
  ELEMENT_DATA: any[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @Input() datos = null;
  dat: any;

  url: any = '';
  urlImage: any = '';
  ulrMultipleMarkers: any = '';
  urlAux: any = '';
  plusvalia: any;
  /*lat = 30.200;
  lng = 20.100;*/
  lat: number;
  lng: number;

  /**Variables para las graficas */
  /**datos.data.request.colonia_preciosm2_general */
  datosPrecioColonia: any;
  datoPlusvalia: any;
  options: any;
  optionsPlusvalia: any;
  datosPropiedadesM2: any;
  datosEdadVivienda: any;
  datosRecamaras: any;
  datosSuperficieConstruida: any;

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

    let idx = 1;

    if (this.datos.data.response.similares) {
      this.datos.data.response.similares.forEach(element => {
        this.urlAux += "&markers=color:blue%7Clabel:" + idx + "%7C" + element.latitud + "," + element.longitud;
        idx++;
      });
      this.urlAux += "&markers=color:green%7Clabel:*%7C" + this.lat + "," + this.lng + "&";
      this.yals.urlToBase64("https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=700x400&format=jpg&maptype=roadmap"
        + this.urlAux +
        "key=AIzaSyDV1v9VqdOKgnwilfhA25PqEFRoSNjHXAQ")
        .subscribe((response: any) => {
          this.ulrMultipleMarkers = "data:image/jpeg;base64," + response.data;
        });
    }
  }

  ngOnChanges(): void {
    //console.log("Datos: ", this.datos.data);
    const fecha: any = (this.datos.data.dateCreated).split("-");
    /*if(fecha[1]==="04"){
      this.indexMonth = 3;
    }*/
    this.indexMonth = parseInt(fecha[1]);
    const diaCreacion: any = fecha[2].split("T");
    this.fechaCreacion = diaCreacion[0] + " de " + this.months[this.indexMonth - 1] + " del " + fecha[0];
    this.fechaConsulta = this.months[this.indexMonth - 1] + " " + fecha[0];
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
        this.ELEMENT_DATA.push({
          position: 0,
          //oferta: element.fecha_oferta,
          oferta: this.fechaConsulta,
          total: this.datos.data.response.valuacion.valuacion,
          m2: this.datos.data.response.valuacion.valuacion_m2,
          cuartos: this.datos.data.response.characteristics.recamaras,
          banos: this.datos.data.response.characteristics.banos,
          parking: this.datos.data.response.characteristics.estacionamientos,
          construccion: this.datos.data.response.characteristics.area_construida,
          edad: this.datos.data.response.characteristics.edad,
          distancia: "-",
          similitud: "-"
        });

        this.datos.data.response.similares.forEach(element => {
          const fechaOferta: any = (element.fecha_oferta).split("/");
          this.indexMonth = parseInt(fechaOferta[1]);
          this.fechaSimilares = this.months[this.indexMonth - 1] + " " + fechaOferta[2];

          this.ELEMENT_DATA.push({
            position: ind,
            //oferta: element.fecha_oferta,
            oferta: this.fechaSimilares,
            total: element.precio_oferta,
            m2: element.precio_m2,
            cuartos: element.recamaras,
            banos: element.banos,
            parking: element.estacionamientos,
            construccion: element.area_construida.toFixed(2),
            edad: (element.edad || 0),
            distancia: element.distancia.toFixed(2),
            similitud: (element.similitud * 100).toFixed(2)
          });
          ind++;
        });
      }

      let indx = 0;
      let indx1 = 0;
      let indx2 = 0;
      const coloniaGeneralNuevo: any[] = [];
      this.datos.data.response.colonia_preciosm2_general.data.nuevo.forEach(element => {
        coloniaGeneralNuevo[indx2] = element * 100;
        indx2++;
      });
      this.datos.data.response.colonia_preciosm2_general.data.usado.forEach(element => {
        this.coloniam2General[indx] = element * 100;
        indx++;

      });
      this.datosPrecioColonia = this.plusvalia ? {
        labels: this.datos.data.response.colonia_preciosm2_general.labels,
        datasets: [
          {
            label: 'Precio Promedio Nuevo',
            backgroundColor: '#0000FF',
            borderColor: '#0080FF',
            data: coloniaGeneralNuevo
          },
          {
            label: 'Precio Promedio Usado',
            backgroundColor: '#00CED1',
            borderColor: '#0080FF',
            //data: this.datos.data.response.colonia_preciosm2_general.data.usado
            data: this.coloniam2General
          }
        ]
      } : {};
      /**grafica de precio propiedad por m2 */
      /** this.datos.data.response.colonia_preciosm2_especifica */
      const coloniaEspecificaNuevo: any[] = [];
      const coloniaEspecificaUsado: any[] = [];
      let idx0 = 0;
      let idx1 = 0;

      this.datos.data.response.colonia_preciosm2_especifica.data.nuevo.forEach(element => {
        coloniaEspecificaNuevo[idx0] = element * 100;
        idx0++;
      });
      this.datos.data.response.colonia_preciosm2_especifica.data.usado.forEach(element => {
        coloniaEspecificaUsado[idx1] = element * 100;
        idx1++;
      });
      this.datosPropiedadesM2 = this.plusvalia ? {
        labels: this.datos.data.response.colonia_preciosm2_especifica.labels,
        //labels: ['35000', '40000', '50000', '50000+'],
        datasets: [
          {
            label: 'Nuevo',
            backgroundColor: '#82FA58',
            borderColor: '#74DF00',
            //data: this.datos.data.response.colonia_preciosm2_especifica.data.nuevo
            data: coloniaEspecificaNuevo
          }, {
            label: 'Usado',
            backgroundColor: '#C8FE2E',
            borderColor: '#74DF00',
            //data: this.datos.data.response.colonia_preciosm2_especifica.data.usado
            data: coloniaEspecificaUsado
          }
        ]
      } : {}

      this.options = {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Resultados en %'
            },
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      }
      this.optionsPlusvalia = {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Resultados en $'
            },
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      }



      /**Grafica edad y tipo de vivienda */
      /** */
      const tipoColoniaNuevo: any[] = [];
      const tipoColoniaUsado: any[] = [];
      let idxTipo = 0;
      let idxTipo0 = 0;
      this.datos.data.response.colonia_tipos_propiedades.data.nuevo.forEach(element => {
        tipoColoniaNuevo[idxTipo] = element * 100;
        idxTipo++;
      });
      this.datos.data.response.colonia_tipos_propiedades.data.usado.forEach(element => {

        tipoColoniaUsado[idxTipo0] = element * 100;
        idxTipo0++;
      });
      //console.log(tipoColoniaUsado);
      this.datosEdadVivienda = this.plusvalia ? {
        labels: ['Casa', 'Departamento'],
        datasets: [
          {
            label: 'Nuevo',
            backgroundColor: '#82FA58',
            borderColor: '#74DF00',
            //data: this.datos.data.response.colonia_tipos_propiedades.data.nuevo
            data: tipoColoniaNuevo
          }, {
            label: 'Usado',
            backgroundColor: '#C8FE2E',
            borderColor: '#74DF00',
            //data: this.datos.data.response.colonia_tipos_propiedades.data.usado
            data: tipoColoniaUsado
          }
        ]
      } : {}

      /**Grafica numero de recamaras */
      /** this.datos.data.response.colonia_recamaras.labels --> .data.nuevo .data.usado */

      if (this.datos.data.response.colonia_recamaras) {
        const recamarasNuevo: any[] = []
        const recamarasUsado: any[] = [];
        let idxRecamaras = 0;
        let idxRecamaras0 = 0;

        this.datos.data.response.colonia_recamaras.data.nuevo.forEach(element => {
          recamarasNuevo[idxRecamaras] = element * 100;
          idxRecamaras++;
        });
        this.datos.data.response.colonia_recamaras.data.usado.forEach(element => {
          recamarasUsado[idxRecamaras0] = element * 100;
          idxRecamaras0++;
        });

        this.datosRecamaras = {
          //labels: this.datos.data.response.colonia_recamaras.labels,
          labels: ['1', '2', '3', '4+'],
          datasets: [
            {
              label: 'Nuevo',
              backgroundColor: '#82FA58',
              borderColor: '#74DF00',
              //data: this.datos.data.response.colonia_recamaras ? this.datos.data.response.colonia_recamaras.data.nuevo : []
              data: recamarasNuevo
            }, {
              label: 'Usado',
              backgroundColor: '#C8FE2E',
              borderColor: '#74DF00',
              //data: this.datos.data.response.colonia_recamaras ? this.datos.data.response.colonia_recamaras.data.usado : []
              data: recamarasUsado
            }
          ]
        }
      }

      /**Grafica superficie construida */
      /** this.datos.data.response.colonia_superficies.labels --> .data.nuevo .data.usado*/
      if (this.datos.data.response.colonia_superficies) {
        const coloniaNuevo: any[] = [];
        const coloniaUsado: any[] = [];
        let idxColonia = 0;
        let idxColonia0 = 0;
        this.datos.data.response.colonia_superficies.data.nuevo.forEach(element => {
          coloniaNuevo[idxColonia] = element * 100;
          idxColonia++;
        });
        this.datos.data.response.colonia_superficies.data.usado.forEach(element => {
          coloniaUsado[idxColonia0] = element * 100;
          idxColonia0++;
        });
        this.datosSuperficieConstruida = {
          labels: ['<60 m2', '60-120 m2', '120-200 m2', '>200 m2'],
          datasets: [
            {
              label: 'Nuevo',
              backgroundColor: '#82FA58',
              borderColor: '#74DF00',
              //data: this.datos.data.response.colonia_superficies ? this.datos.data.response.colonia_superficies.data.nuevo : []
              data: coloniaNuevo
            },
            {
              label: 'Usado',
              backgroundColor: '#C8FE2E',
              borderColor: '#74DF00',
              //data: this.datos.data.response.colonia_superficies ? this.datos.data.response.colonia_superficies.data.usado : []
              data: coloniaUsado
            }
          ]
        }
      }

      /**Grafica plusvalia */
      const fechaHistorico: any[] = [];
      const precioHistorico: any[] = [];
      let idxHistorico = 0;
      let idxHistorico0 = 0;
      this.datos.data.response.precio_historico_m2.forEach(element => {
        const fechaSplit: any = (element.fecha).split("-");
        fechaHistorico[idxHistorico] = this.months[parseInt(fechaSplit[1]) - 1] + " " + fechaSplit[0];

        precioHistorico[idxHistorico] = (element.promedio_venta).toFixed(2);
        idxHistorico++;
      });
      this.datoPlusvalia = {
        labels: fechaHistorico,
        datasets: [
          {
            label: 'Precio Promedio por m2',
            data: precioHistorico,
            fill: false,
            backgroundColor: '#4bc0c0',
            borderColor: '#4bc0c0'
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


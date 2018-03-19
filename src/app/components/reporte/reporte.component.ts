import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  generatedReport = "Dic 1993";
  estimatedDate = "ENERO 2016";
  idReport = 123;
  direccion = "C-100 #491B x 59 y 59L Col. Bojorquez CP: 9700 Merida, Yucatan" 
  constructor() { }

  ngOnInit() {
  }

}

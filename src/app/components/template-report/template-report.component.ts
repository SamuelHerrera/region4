import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-report',
  templateUrl: './template-report.component.html',
  styleUrls: ['./template-report.component.css']
})
export class TemplateReportComponent implements OnInit {


 @Input() cliente: any = {}; 
  constructor() { }

  ngOnInit() {
    console.log("NombreCliente", this.cliente.name);
  }

}

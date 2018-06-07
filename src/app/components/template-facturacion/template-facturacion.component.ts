import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-facturacion',
  templateUrl: './template-facturacion.component.html',
  styleUrls: ['./template-facturacion.component.css']
})
export class TemplateFacturacionComponent implements OnInit {
  @Input() facturacion:any = {};
  constructor() { }

  ngOnInit() {
    console.log(this.facturacion);
  }

}

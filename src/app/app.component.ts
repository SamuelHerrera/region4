import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { YalsService } from './services/yals.service';
import { YalsRequest } from './models/yals.model';
import { PagofacilService } from './services/pagofacil.service';
import { Pagofacilrequest } from './models/pagofacil.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private messageService: MessageService, private pf: PagofacilService) { }

  ngOnInit(): void {
    // const pagofacilreq: Pagofacilrequest = {
    //   nombre: "Juan", apellidos: "Lopez", numeroTarjeta: "5579567890123456",
    //   cvt: "123", cp: "11560", mesExpiracion: "10", anyoExpiracion: "15",
    //   monto: "100", idSucursal: "1", idUsuario: "1", idServicio: "3",
    //   email: "comprador@correo.com", telefono: "5550220910",
    //   celular: "5550123456", calleyNumero: "Anatole France 311",
    //   colonia: "Polanco", municipio: "Miguel Hidalgo",
    //   estado: "Distrito Federal", pais: "Mexico",
    //   param1: "", param2: "", param3: "", param4: "", param5: ""
    // }

    // this.pf.generatePago(pagofacilreq).subscribe(response => {
    //   console.log(response);
    // });
  }

}

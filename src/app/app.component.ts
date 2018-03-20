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

  constructor(private messageService: MessageService, private pf: PagofacilService, private yal: YalsService) { }

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


    // const yalsr: YalsRequest = {
    //   "street": "Mariano Escobedo",
    //   "num_ext": "748",
    //   "zip": "11590",
    //   "colonia": "Anzures",
    //   "municipio": "Miguel Hidalgo",
    //   "estado": "Ciudad de México",
    //   "ciudad": "Ciudad de México",
    //   "id_tipo_propiedad": 4,
    //   "recamaras": 2,
    //   "banos": 1,
    //   "medios_banos": 1,
    //   "estacionamientos": 1,
    //   "area_construida": 100,
    //   "superficie_terreno": 0,
    //   "edad": 0,
    //   "amenities": ["terraza", "cocina_integral"],
    //   "email": "YOUR_EMAIL",
    //   "api_key": "YOUR_API_KEY",
    //   "latitud": 19.425436, // Opcional 
    //   "longitud": -99.178435 // Opcional 
    // };

    // this.yal.generateRequest(yalsr, null).subscribe(response => {
    //   console.log(response)
    // });

  }

}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { YalsService } from './services/yals.service';
import { YalsRequest } from './models/yals.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private messageService: MessageService, private yals: YalsService) { }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('usuario')));
    const yals: YalsRequest = {
      "street": "Mariano Escobedo",
      "num_ext": "748",
      "zip": "11590",
      "colonia": "Anzures",
      "municipio": "Miguel Hidalgo",
      "estado": "Ciudad de México",
      "ciudad": "Ciudad de México",
      "id_tipo_propiedad": 4,
      "recamaras": 2,
      "banos": 1,
      "medios_banos": 1,
      "estacionamientos": 1,
      "area_construida": 100,
      "superficie_terreno": 0,
      "edad": 0,
      "amenities": ["terraza", "cocina_integral"],
      "email": "",
      "api_key": "",
      "latitud": 19.425436, // Opcional 
      "longitud": -99.178435 // Opcional 
    };

    this.yals.generateRequest(yals, null).subscribe(response => {
      console.log(response);
    });
  }

}

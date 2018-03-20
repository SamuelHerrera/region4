import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-paso-2',
  templateUrl: './paso-2.component.html',
  styleUrls: ['./paso-2.component.css']
})
export class Paso2Component implements OnInit {

  @Input() avaluoForm: any;

  isNew = false;

  types: SelectItem[];
  selectedType: String;

  homeTypes: SelectItem[];
  selectedHomeType: String;

  numbers1: SelectItem[];
  numbers0: SelectItem[];
  selectedNumRec: String;
  selectedNumBath: String;
  selectedNumMBath: String;
  selectedNumBox: String;

  /**Direccion */
  calle = 100;
  numExt = "491B";
  colonia = "Bojórquez";
  codigoPostal = 97300;
  municipio = "Mérida";
  estado = "Yucatán";
  ciudad = "Mérida";
  /** */
  selectedAge: String;

  constructor() {
    this.types = [
      { label: 'Casa', value: 2 },
      { label: 'Departamento', value: 4 }
    ];

    this.homeTypes = [
      { label: 'Sola', value: 'Sola' },
      { label: 'En Condominio', value: 'Condominio' }
    ];

    this.numbers1 = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4+', value: '4' }
    ];

    this.numbers0 = [
      { label: '0', value: '0' },
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3+', value: '3' }
    ];
  }

  ngOnInit() {
  }

  nuevo() {
    this.isNew = !this.isNew;
    this.avaluoForm['edad'] = 0;
  }

}

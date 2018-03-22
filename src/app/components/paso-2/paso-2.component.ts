import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-paso-2',
  templateUrl: './paso-2.component.html',
  styleUrls: ['./paso-2.component.css']
})
export class Paso2Component implements OnInit {

  @Input() avaluoForm: any;
  @Output() completed = new EventEmitter<boolean>();

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
  calle: number;
  numExt: String;
  codigoPostal: number;
  municipio: String;
  estado: String;
  ciudad: String;
  colonia: String;
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
    this.verify();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentInit() {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.avaluoForm) {
      this.calle = this.avaluoForm.street;
      this.numExt = this.avaluoForm.num_ext;
      this.colonia = this.avaluoForm.colonia;
      this.codigoPostal = this.avaluoForm.zip;
      this.municipio = this.avaluoForm.municipio;
      this.estado = this.avaluoForm.estado;
      this.ciudad = this.avaluoForm.ciudad;
    }
  }

  onChange() {
    this.verify();

    

  }

  verify() {
    if (this.avaluoForm['id_tipo_propiedad']
      && this.avaluoForm['recamaras']
      && this.avaluoForm['banos']
      && this.avaluoForm['medios_banos']
      && this.avaluoForm['estacionamientos']
      && this.avaluoForm['area_construida']
      && this.avaluoForm['superficie_terreno']
      && (this.avaluoForm['edad']) || this.isNew) {
      this.completed.emit(true);
    } else {
      this.completed.emit(false);
    }
  }

}

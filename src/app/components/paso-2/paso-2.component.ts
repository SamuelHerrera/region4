import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-paso-2',
  templateUrl: './paso-2.component.html',
  styleUrls: ['./paso-2.component.css']
})
export class Paso2Component implements OnInit {

  timeout = null;

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

  areaConstruida: boolean;
  superficieTerreno: boolean;
  edad: boolean;

  constructor(private messageService: MessageService) {


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



  onChange(event) {
    if (event === 1) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.messageService.clear();
        if (this.areaConstruida === false) {
          this.messageService.add({
            severity: 'info', summary: 'Área Construída',
            detail: 'El valor del área construida debe estar entre 30 y 1000 m2'
          });
        }
        if (this.superficieTerreno === false) {
          this.messageService.add({
            severity: 'info', summary: 'Superficie Construída',
            detail: 'El valor de la superficie del terreno debe estar entre 0 y 1000 m2'
          });
        }
        if (this.edad === false) {
          this.messageService.add({
            severity: 'info', summary: 'Años de antigüedad',
            detail: 'Los años de antigüedad deben ser entre 0 y 99'
          });
        }
      });
    }
    if (event === 3) {
      this.messageService.clear();
      if (this.areaConstruida === false) {
        this.messageService.add({
          severity: 'info', summary: 'Área Construída',
          detail: 'El valor del área construida debe estar entre 30 y 1000 m2'
        });
      }
      if (this.superficieTerreno === false) {
        this.messageService.add({
          severity: 'info', summary: 'Superficie Construída',
          detail: 'El valor de la superficie del terreno debe estar entre 0 y 1000 m2'
        });
      }
      if (this.edad === false) {
        this.messageService.add({
          severity: 'info', summary: 'Años de antigüedad',
          detail: 'Los años de antigüedad deben ser entre 0 y 99'
        });
      }
    }
    this.verify();
  }

  verify() {
    if (this.avaluoForm['area_construida'] >= 30 && this.avaluoForm['area_construida'] <= 1000) {
      this.areaConstruida = true;
      //console.log(this.avaluoForm['area_construida']);
    } else { this.areaConstruida = false }

    if (this.avaluoForm['superficie_terreno'] !== "" && this.avaluoForm['superficie_terreno'] >= 0 && this.avaluoForm['superficie_terreno'] <= 1000) {
      this.superficieTerreno = true;
    } else { this.superficieTerreno = false; }

    if (this.avaluoForm['edad'] !== "" && this.avaluoForm['edad'] >= 0 && this.avaluoForm['edad'] <= 99) {
      this.edad = true;
    } else { this.edad = false; }

    if (this.avaluoForm['id_tipo_propiedad']
      && this.avaluoForm['recamaras']
      && this.avaluoForm['banos']
      && this.avaluoForm['medios_banos']
      && this.avaluoForm['estacionamientos']
      && this.areaConstruida //this.avaluoForm['area_construida']
      && this.superficieTerreno //this.avaluoForm['superficie_terreno']
      && (this.edad/*this.avaluoForm['edad']*/) || this.isNew) {
      this.completed.emit(true);
    } else {
      this.completed.emit(false);
    }
    setTimeout(() => {
      this.messageService.clear();
    }, 3500);
  }

}

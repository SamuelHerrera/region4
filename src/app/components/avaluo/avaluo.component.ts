import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-avaluo',
  templateUrl: './avaluo.component.html',
  styleUrls: ['./avaluo.component.css']
})
export class AvaluoComponent implements OnInit {

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

  

  selectedAge: string[] = [];

  constructor() {
    this.types = [
      {label: 'Casa', value: 'Casa'},
      {label: 'Departamento', value: 'Departamento'}
    ];

    this.homeTypes = [
      {label: 'Sola', value: 'Sola'},
      {label: 'En Condominio', value: 'Condominio'}
    ];

    this.numbers1 = [
      {label: '1', value: '1'},
      {label: '2', value: '2'},
      {label: '3', value: '3'},
      {label: '4+', value: '4+'}
    ];

    this.numbers0 = [
      {label: '0', value: '0'},
      {label: '1', value: '1'},
      {label: '2', value: '2'},
      {label: '3+', value: '3+'}
    ];

   }
   

  ngOnInit() {
  }

}

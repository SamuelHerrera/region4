import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paso-3',
  templateUrl: './paso-3.component.html',
  styleUrls: ['./paso-3.component.css']
})
export class Paso3Component implements OnInit {

  @Input() avaluoForm: any;

  selectedAA: String;
  selectedCI: String;
  selectedGym: String;
  selectedTerraza: String;
  selectedAlberca: String;
  selectedLavado: String;
  selectedJardin: String;
  selectedAmueblado: String;
  selectedEstudio: String;
  selectedJacuzzi: String;
  selectedSeguridad: String;


  constructor() { }

  ngOnInit() {
  }

  setConfig() {
    this.avaluoForm['amenities'] = [
      (this.selectedAA ? 'aire_acondicionado' : null),
      (this.selectedAlberca ? 'alberca' : null),
      (this.selectedAmueblado ? 'amueblado' : null),
      (this.selectedCI ? 'cocina_integral' : null),
      (this.selectedLavado ? 'cuarto_servicio' : null),
      (this.selectedEstudio ? 'estudio' : null),
      (this.selectedGym ? 'gimnasio' : null),
      (this.selectedJardin ? 'jardin' : null),
      (this.selectedJacuzzi ? 'jacuzzi' : null),
      (this.selectedTerraza ? 'terraza' : null),
      (this.selectedSeguridad ? 'seguridad' : null),
    ];
    this.avaluoForm['amenities'] = this.avaluoForm['amenities'].filter(n => n)

  }
}

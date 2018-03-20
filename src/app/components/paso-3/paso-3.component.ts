import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paso-3',
  templateUrl: './paso-3.component.html',
  styleUrls: ['./paso-3.component.css']
})
export class Paso3Component implements OnInit {
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

}

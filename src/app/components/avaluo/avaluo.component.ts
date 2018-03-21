import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YalsService } from '../../services/yals.service';
import { YalsRequest } from '../../models/yals.model';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-avaluo',
  templateUrl: './avaluo.component.html',
  styleUrls: ['./avaluo.component.css'],
  providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class AvaluoComponent implements OnInit {

  index = 0;
  step1 = false;
  step2 = false;
  step3 = false;
  step4 = false;

  /*Todo lo que incluye el stepper*/
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  /* */

  selectedAge: string[] = [];

  avaluoForm: any = {};

  avaluoResponse: any = {};

  constructor(private router: Router, private yals: YalsService, private _formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  enviarCorreo() {
    console.log(this.avaluoForm);
    const yals_req: YalsRequest = this.avaluoForm;
    yals_req.id_tipo_propiedad = (+yals_req.id_tipo_propiedad);
    yals_req.recamaras = (+yals_req.recamaras);
    yals_req.banos = (+yals_req.banos);
    yals_req.medios_banos = (+yals_req.medios_banos);
    yals_req.estacionamientos = (+yals_req.estacionamientos);
    yals_req.area_construida = (+yals_req.area_construida);
    yals_req.superficie_terreno = (+yals_req.superficie_terreno);
    yals_req.edad = (+yals_req.edad);
    this.yals.generateRequest(yals_req, null).subscribe(response => {
      console.log(response);
      this.avaluoResponse = response;
    });
  }
  nvoAvaluo() {

  }

  imprimir() {
    const element = document.getElementById('element-to-print');
    html2pdf(element, {
      margin: 1,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  }

  stepchanged(event: any) {
    console.log(event)
    if (!event.previouslySelectedStep.completed) {
      setTimeout(() => {
        console.log(event.previouslySelectedIndex)
        this.index = event.previouslySelectedIndex;
      }, 5000);
    }
  }

}

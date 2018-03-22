import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YalsService } from '../../services/yals.service';
import { YalsRequest } from '../../models/yals.model';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-avaluo',
  templateUrl: './avaluo.component.html',
  styleUrls: ['./avaluo.component.css'],
  providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class AvaluoComponent implements OnInit {

  isHidden = false;

  index = 0;
  step1 = false;
  step2 = false;
  step3 = true;
  step4 = false;
  selectedAge: string[] = [];
  avaluoForm: any = {};
  avaluoResponse: any = null;
  loading = false;

  constructor(private router: Router, private yals: YalsService, private messageService: MessageService) {
  }

  ngOnInit() {
  }

  enviarCorreo() {
    const yals_req: YalsRequest = this.avaluoForm;
    yals_req.id_tipo_propiedad = (+yals_req.id_tipo_propiedad);
    yals_req.recamaras = (+yals_req.recamaras);
    yals_req.banos = (+yals_req.banos);
    yals_req.medios_banos = (+yals_req.medios_banos);
    yals_req.estacionamientos = (+yals_req.estacionamientos);
    yals_req.area_construida = (+yals_req.area_construida);
    yals_req.superficie_terreno = (+yals_req.superficie_terreno);
    yals_req.edad = (+yals_req.edad);
    this.loading = true;
    this.yals.generateRequest(yals_req, null).subscribe(response => {
      this.avaluoResponse = response;
      this.index = 4;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.messageService.add({
        severity: 'error', summary: 'Error procesando reporte',
        detail: `Se ha producido un error procesando su reporte, verifique los datos proporcionados 
        e intente nuevamente, en caso contrario porfavor contacte a soporte.`
      });
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

  // stepchanged(event: any) {
  // }

}

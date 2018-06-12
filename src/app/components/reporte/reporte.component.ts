import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2pdf from '../../../assets/js/html2pdf';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  public show = false;
  public datos = null;

  ngOnInit() {
    this.pushed();
  }


  pushed() {
    const elementToPrint = document.getElementById('element-to-print');
    const element = document.getElementById('somedata');
    console.log(element);
    const pdfData = html2pdf(elementToPrint, {
      margin: 0.4,
      filename: 'reporte.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });

    pdfData.then(data => {
      FileSaver.saveAs(this.b64toBlob(data.split(';base64,').pop(), "application/pdf"), 'asdasd');
    });



  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    let sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}

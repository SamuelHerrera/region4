import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ClientService } from '../../services/client.service';
import { YalsService } from '../../services/yals.service';
import { MessageService } from 'primeng/components/common/messageservice';
import * as jsPDF from 'jspdf';
import * as html2pdf from '../../../assets/js/html2pdf';
import { style } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogCuponesComponent } from '../dialog-cupones/dialog-cupones.component';
import { CuponService } from '../../services/cupon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  dataLoaded = false;

  datosImprimir: any;

  displayedColumns = ['position', 'name', 'phone', 'weight', 'symbol'];
  displayedColumns2 = ['client', 'dateCreated', 'weight', 'symbol', 'symbol1', 'symbol2', 'pagado', 'actions'];

  displayedColumnsCupones = ['campania', 'descuento', 'cupon', 'descripcion', 'estatus'];

  dataSource = new MatTableDataSource([]);
  dataSource2 = new MatTableDataSource([]);
  dataSource3 = new MatTableDataSource([]);
  yalsconfig: any = {};

  cupon: string;
  name: string;

  login = true;
  loginSuccess = false;

  // login = false;
  // loginSuccess = true;

  user: any;
  pass: any;

  constructor(public dialog: MatDialog, private clientService:
    ClientService, private yals: YalsService, private messageService: MessageService,
    private cuponService: CuponService, private router: Router) { }

  validarLogin() {
    if ((this.user === 'Administrador' && this.pass === 'Region42018') ||
      (this.user === 'Administrador2' && this.pass === 'ItexSolutions1!')) {
      this.messageService.add({ severity: 'success', summary: 'Inicio de sesión', detail: 'Bienvenido administrador: ' + this.user });
      setTimeout(() => {
        this.login = false;
        setTimeout(() => {
          this.loginSuccess = true;
        });
      });
    } else { this.messageService.add({ severity: 'error', summary: 'No match', detail: 'Usuario y contraseña no coinciden.' }); }

  }
  /**PopUp Cupones */

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCuponesComponent, {
      width: '550px',
      data: { cupon: this.cupon }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cuponService.getCupons().subscribe((response: any) => {
        this.dataSource3 = new MatTableDataSource(response.data.docs);
      });
    });
  }

  reload() {
    this.dataLoaded = true;
    this.clientService.getClients().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response.data.docs);
    });
    this.yals.getConfigs().subscribe((response: any) => {
      this.yalsconfig = response.data;
    });
    this.yals.getRequest().subscribe((response: any) => {
      response.data.docs.forEach(element => {
        element['hidden'] = false;

        this.clientService.getClientById(element.clientid).subscribe((cli: any) => {
          try {
            element['client'] = cli.data.docs[0].name;
            element['ramo'] = cli.data.docs[0].ramo;
          } catch (e) { }

        });
      });
      try {
        response.data.docs = response.data.docs.sort((a: any, b: any) => {
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        });
      } catch (e) { console.log(e); }

      this.dataSource2 = new MatTableDataSource(response.data.docs);
      this.dataLoaded = false;
    });
  }

  /** */
  ngOnInit() {
    this.dataSource2.sort = this.sort;
    this.clientService.getClients().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response.data.docs);
    });
    this.yals.getConfigs().subscribe((response: any) => {
      this.yalsconfig = response.data;
    });
    this.yals.getRequest().subscribe((response: any) => {
      response.data.docs.forEach(element => {
        element['hidden'] = false;

        this.clientService.getClientById(element.clientid).subscribe((cli: any) => {
          try {
            element['client'] = cli.data.docs[0].name;
            element['ramo'] = cli.data.docs[0].ramo;
          } catch (e) { }

        });
      });
      try {
        response.data.docs = response.data.docs.sort((a: any, b: any) => {
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
        });
      } catch (e) { console.log(e); }

      this.dataSource2 = new MatTableDataSource(response.data.docs);
    });
    this.cuponService.getCupons().subscribe((response: any) => {
      this.dataSource3 = new MatTableDataSource(response.data.docs);
    });
  }

  saveconfig() {
    this.yals.setConfigs(this.yalsconfig.url, this.yalsconfig.mail, this.yalsconfig.key).subscribe((response: any) => {
      this.yalsconfig = response;
      this.messageService.add({ severity: 'success', summary: 'Inicio de sesion', detail: 'Usuario inicio sesion satisfactoriamente.' });
    });
  }

  imprimir(id, elemento) {
    this.dataLoaded = true;
    elemento['hidden'] = true;
    setTimeout(() => {
      /*console.log("Elements", elemento);
      console.log("childs node", document.getElementById(id).childNodes);*/
      if (elemento.response.similares) {
        if (this.getMobileOperatingSystem() === 'iOS') {
          this.datosImprimir = document.getElementById('element-to-print-ios-' + id);
        } else {
          this.datosImprimir = document.getElementById('element-to-print-' + id);
        }
      } else {
        this.datosImprimir = document.getElementById('basic-element-to-print-' + id);
      }

      const datapdf = html2pdf(this.datosImprimir, {
        margin: 0.4,
        filename: 'reporte.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        action: 'save'
      });
      datapdf.then(data => {
        this.dataLoaded = false;
      });
    }, 2500);

  }

  getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }

    if (/android/i.test(userAgent)) {
      return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window['MSStream']) {
      return 'iOS';
    }

    return 'unknown';
  }

  changeStatus(id, status) {
    this.cuponService.changeStatus(id, status).subscribe(response => {
      this.cuponService.getCupons().subscribe((response2: any) => {
        this.dataSource3 = new MatTableDataSource(response2.data.docs);
      });
    });
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  applyFilter2(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource2.filter = filterValue;
  }

}

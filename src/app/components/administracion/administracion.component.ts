import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ClientService } from '../../services/client.service';
import { YalsService } from '../../services/yals.service';
import { MessageService } from 'primeng/components/common/messageservice';
import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import { style } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogCuponesComponent } from '../dialog-cupones/dialog-cupones.component';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  displayedColumns2 = ['position', 'name', 'weight', 'symbol', 'symbol1', 'symbol2', 'actions'];

  displayedColumnsCupones = ['campania', 'descuento', 'cupon', 'descripcion', 'estatus'];

  dataSource = new MatTableDataSource([]);
  dataSource2 = new MatTableDataSource([]);
  yalsconfig: any = {};

  /**Para validar el login */
  /**
   * 
   * 
Usuario:Administrador
PSW: Region42018

Usuario:Administrador2
PSW:ItexSolutions1!
   */
  login: boolean = true;
  loginSuccess: boolean = false;
  user: any;
  pass: any;
  //@ViewChild('f') form: any;
  /** */
  constructor(public dialog: MatDialog, private clientService: ClientService, private yals: YalsService, private messageService: MessageService) { }

  validarLogin() {
    console.log("user: ", this.user);

    if ((this.user === "Administrador" && this.pass === "Region42018") ||
      (this.user === "Administrador2" && this.pass === "ItexSolutions1!")) {
      //console.log("Es el administrador 1");
      this.messageService.add({ severity: 'success', summary: 'Inicio de sesión', detail: "Bienvenido administrador: " + this.user });
      this.login = false;
      this.loginSuccess = true;
    } else { this.messageService.add({ severity: 'error', summary: 'No match', detail: "Usuario y contraseña no coinciden." }); }

  }
  /**PopUp Cupones */

  cupon: string;
  name: string;

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogCuponesComponent, {
      width: '350px',
      data: { cupon: this.cupon }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', this.cupon);
      this.cupon = result;
    });
  }

  /** */
  ngOnInit() {
    this.clientService.getClients().subscribe((response: any) => {
      //console.log(response)
      this.dataSource = new MatTableDataSource(response.data.docs);
    });
    this.yals.getConfigs().subscribe((response: any) => {
      this.yalsconfig = response.data;
    });
    this.yals.getRequest().subscribe((response: any) => {
      //console.log(response);
      response.data.docs.forEach(element => {
        this.clientService.getClientById(element.clientid).subscribe((cli: any) => {
          element['client'] = cli.data.docs[0].name;
          element['ramo'] = cli.data.docs[0].ramo;
        });
      });
      this.dataSource2 = new MatTableDataSource(response.data.docs);
      setTimeout(() => { console.log(response.data.docs) })
    });
  }

  saveconfig() {
    this.yals.setConfigs(this.yalsconfig.url, this.yalsconfig.mail, this.yalsconfig.key).subscribe((response: any) => {
      this.yalsconfig = response;
      this.messageService.add({ severity: 'success', summary: 'Inicio de sesion', detail: "Usuario inicio sesion satisfactoriamente." });
    });
  }

  imprimir(id) {

    const element = document.getElementById(id).childNodes[1];
    html2pdf(element, {
      margin: 1,
      filename: 'reporte.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
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

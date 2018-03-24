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
import { CuponService } from '../../services/cupon.service';

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
    ClientService, private yals: YalsService, private messageService: MessageService, private cuponService: CuponService) { }

  validarLogin() {
    if ((this.user === "Administrador" && this.pass === "Region42018") ||
      (this.user === "Administrador2" && this.pass === "ItexSolutions1!")) {
      //console.log("Es el administrador 1");
      this.messageService.add({ severity: 'success', summary: 'Inicio de sesión', detail: "Bienvenido administrador: " + this.user });
      setTimeout(() => {
        this.login = false;
        setTimeout(() => {
          this.loginSuccess = true;
        });
      });
    } else { this.messageService.add({ severity: 'error', summary: 'No match', detail: "Usuario y contraseña no coinciden." }); }

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

  /** */
  ngOnInit() {
    this.clientService.getClients().subscribe((response: any) => {
      //console.log("Response", response)
      this.dataSource = new MatTableDataSource(response.data.docs);
    });
    this.yals.getConfigs().subscribe((response: any) => {
      this.yalsconfig = response.data;
    });
    this.yals.getRequest().subscribe((response: any) => {
      console.log("Response",response);
      response.data.docs.forEach(element => {
        console.log("Elemento-", response.data.docs);
        this.clientService.getClientById(element.clientid).subscribe((cli: any) => {

          element['client'] = cli.data.docs[0].name;
          element['ramo'] = cli.data.docs[0].ramo;
        });
      });
      this.dataSource2 = new MatTableDataSource(response.data.docs);
      setTimeout(() => { console.log(response.data.docs) })
    });
    this.cuponService.getCupons().subscribe((response: any) => {
      console.log(response)
      this.dataSource3 = new MatTableDataSource(response.data.docs);
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

  changeStatus(id, status) {
    this.cuponService.changeStatus(id, status).subscribe(response => {
      this.cuponService.getCupons().subscribe((response2: any) => {
        this.dataSource3 = new MatTableDataSource(response2.data.docs);
      });
    })
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

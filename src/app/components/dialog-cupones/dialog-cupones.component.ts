import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-cupones',
  templateUrl: './dialog-cupones.component.html',
  styleUrls: ['./dialog-cupones.component.css']
})
export class DialogCuponesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCuponesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public descuentos: any[] = [
    { name: '50%', code: '50' },
    { name: '40%', code: '40' },
    { name: '30%', code: '30' },
    { name: '20%', code: '20' }
  ];

  public Estatus: any[] = [
    { name: 'Activo', code: 'Activo' },
    { name: 'Inactivo', code: 'Inactivo' }
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

  crearCupon(){

  }

}

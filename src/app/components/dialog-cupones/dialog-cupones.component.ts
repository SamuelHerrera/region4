import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CuponService } from '../../services/cupon.service';

@Component({
  selector: 'app-dialog-cupones',
  templateUrl: './dialog-cupones.component.html',
  styleUrls: ['./dialog-cupones.component.css']
})
export class DialogCuponesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCuponesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cupon: CuponService) { }

  public descuentos: any[] = [
    { name: '5%', code: 5 },
    { name: '10%', code: 10 },
    { name: '15%', code: 15 },
    { name: '20%', code: 20 },
    { name: '25%', code: 25 },
    { name: '30%', code: 30 },
    { name: '35%', code: 35 },
    { name: '40%', code: 40 },
    { name: '45%', code: 45 },
    { name: '50%', code: 50 },
    { name: '55%', code: 55 },
    { name: '60%', code: 60 },
    { name: '65%', code: 65 },
    { name: '70%', code: 70 },
    { name: '75%', code: 75 },
    { name: '80%', code: 80 },
    { name: '85%', code: 85 },
    { name: '90%', code: 90 },
    { name: '95%', code: 95 }
  ];

  public Estatus: any[] = [
    { name: 'Activo', code: true },
    { name: 'Inactivo', code: false }
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

  crearCupon() {
    this.cupon.generateCupon(this.data.campania, this.data.porcentaje.code,
      this.data.cupon, this.data.descripcion, this.data.estatus.code).subscribe(response => {
        this.dialogRef.close();
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.snackBar.open('Al entrar en esta web ya has sido informado sobre la utilización de las cookies a través de un aviso o alerta. Si has accedido y sigues navegando, estás aceptando la instalación de estas cookies. Consultalas en https://www.valorinmuebles.com.mx/politica-de-cookies', 'Ok', {
      duration: 15000,
    });
  }

}

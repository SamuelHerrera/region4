import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ObservablesService } from '../../services/observables.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  cliente: any = {};
  block = false;

  constructor(public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private mails: MailService,
    private observableService: ObservablesService,
    private router: Router) { }

  ngOnInit() {
  }

  public recuperar() {
    this.block = true;
    this.clientService.getClientsByMail(this.emailFormControl.value).subscribe((cliente: any) => {
      this.cliente = cliente.data.docs[0];
      if (cliente.data.docs !== '' && (cliente.data.docs[0].mail === this.emailFormControl.value)) {
        const HTMLPassword: any = document.getElementById('recoveryPassword');
        console.log(HTMLPassword);
        setTimeout(() => {
          this.mails.sendMail({
            from: 'usuario@valorinmuebles.com.mx',
            subject: 'Recuperacion de contraseña',
            to: this.emailFormControl.value,
            html: HTMLPassword.innerHTML
          }).subscribe((response: any) => {
            this.router.navigate(['/sesion']);
            this.snackBar.open('Se ha enviado un correo con su contraseña.', 'Ok', {
              duration: 2000,
            });
          });
        }, 1000);
      } else {
        this.snackBar.open('El correo no se encuentra registrado.', 'Ok', {
          duration: 2000,
        });
        this.block = false;
      }

    },
      error => {
        this.snackBar.open(error.message, 'Ok', {
          duration: 2000,
        });
        this.block = false;
      });
  }

}

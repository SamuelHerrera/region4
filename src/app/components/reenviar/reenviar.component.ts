import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ObservablesService } from '../../services/observables.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-reenviar',
  templateUrl: './reenviar.component.html',
  styleUrls: ['./reenviar.component.css']
})
export class ReenviarComponent implements OnInit {

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

  public reenviar() {
    this.block = true;
    this.clientService.getClientsByMail(this.emailFormControl.value).subscribe((cliente: any) => {
      if (cliente.data.docs !== '' && (cliente.data.docs[0].mail === this.emailFormControl.value)) {
        const clave = cliente.data.docs[0].activationCode;
        this.cliente = cliente.data.docs[0];
        setTimeout(() => {
          this.mails.sendMail({
            to: this.emailFormControl.value,
            html: document.getElementById('template_activacion').innerHTML,
            text: '',
            subject: 'Reenvío de código de activación'
          }).subscribe((response: any) => {
            this.snackBar.open('Se a enviado un correo con su código de activación.', 'Ok', {
              duration: 2000,
            });
            this.router.navigate(['/activacion']);
          });
        }, 1000);
      } else {
        this.snackBar.open('El correo no se encuentra registrado', 'Ok', {
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

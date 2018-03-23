import { Component, OnInit, ViewChild } from '@angular/core';
import { MailService } from '../../services/mail.service';
import { ClientService } from '../../services/client.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  @ViewChild('f') form: any;
  constructor(private router: Router, private mails: MailService,
    private clients: ClientService, private messageService: MessageService) { }

  ngOnInit() {

  }

  recuperarContrasena() {
    if (this.form.form.valid) {
      this.form.ngSubmit.emit()
    } else {
      Object.keys(this.form.form.controls).forEach(field => {
        const control: FormControl = this.form.form.get(field);
        control.markAsTouched({ onlySelf: true });
        control.markAsPristine({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
        if (!control.valid) {
          this.messageService.add({ severity: 'error', summary: 'Validacion', detail: ('Campo ' + field + ' es incorrecto.') });
        }
      });
    }
    return false;
  }

  public onSubmit(form) {
    this.clients.getClientsByMail(this.form.form.controls.correo.value).subscribe((cliente: any) => {

      if (cliente.data.docs !== "" && (cliente.data.docs[0].mail === this.form.form.controls.correo.value)) {
        const pass = cliente.data.docs[0].password;

        this.mails.sendMail({
          from: "usuario@valorinmuebles.com.mx",
          to: this.form.form.controls.correo.value,
          text: "Su contraseña es: " + pass, subject: "Recuperación de contraseña"
        }).subscribe((response: any) => {

        });

        this.router.navigate(['/iniciosesion']);
        this.messageService.add({
          severity: 'success',
          summary: 'Recuperación de contraseña', detail: 'Se a enviado un correo con su contraseña.'
        });
      } else { this.messageService.add({ severity: 'error', summary: 'Server', detail: "El correo no se encuentra registrado" }); }

    },
      error => {
        //console.log("error: ",error)
        this.messageService.add({ severity: 'error', summary: 'Server', detail: error.message });
      });
  }

}

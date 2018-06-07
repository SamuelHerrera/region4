import { Component, OnInit, ViewChild } from '@angular/core';
import { MailService } from '../../services/mail.service';
import { ClientService } from '../../services/client.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reenviar-clave',
  templateUrl: './reenviar-clave.component.html',
  styleUrls: ['./reenviar-clave.component.css']
})
export class ReenviarClaveComponent implements OnInit {
  @ViewChild('f') form: any;
  cliente: any;

  block = false;
  constructor(private router: Router, private mails: MailService, private clients: ClientService, private messageService: MessageService) { }

  ngOnInit() {
  }

  reenviarClave() {
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
    this.block = true;
    this.clients.getClientsByMail(this.form.form.controls.correo.value).subscribe((cliente: any) => {

      if (cliente.data.docs !== "" && (cliente.data.docs[0].mail === this.form.form.controls.correo.value)) {
        const clave = cliente.data.docs[0].activationCode;
        this.cliente = cliente.data.docs[0];
        setTimeout(() => {
          this.mails.sendMail({
            to: this.form.form.controls.correo.value,
            html: document.getElementById("template_activacion").innerHTML,
            text: "",
            //"Use el código " + clave + " para activar su cuenta en http://www.valorinmuebles.com.mx/activacion",
            subject: "Reenvío de código de activación"
          }).subscribe((response: any) => {
            //console.log("Response", response);

          });
          this.router.navigate(['/activacion']);
          this.messageService.add({ severity: 'success', summary: 'Reenvío de código de activación', detail: 'Se a enviado un correo con su código de activación.' });
        }, 2500);



      } else {
        this.messageService.add({ severity: 'error', summary: 'Server', detail: "El correo no se encuentra registrado" });
        this.block = false;
      }

    },
      error => {
        //console.log("error: ",error)
        this.messageService.add({ severity: 'error', summary: 'Server', detail: error.message });
        this.block = false;
      });
  }

}

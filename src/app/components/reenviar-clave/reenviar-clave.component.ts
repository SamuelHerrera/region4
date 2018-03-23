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
    this.clients.getClientsByMail(this.form.form.controls.correo.value).subscribe((cliente: any) => {
      console.log(cliente.data.docs[0]);

      if (cliente.data.docs != "" && (cliente.data.docs[0].mail === this.form.form.controls.correo.value)) {
        const clave = cliente.data.docs[0].activationCode;

        this.mails.sendMail({ to: this.form.form.controls.correo.value, text: "Use el código " + clave + " para activar su cuenta en http://itexsolutions.com.mx/activacion", subject: "Reenvío de clave" }).subscribe((response: any) => {
          //console.log("Response", response);

        });
        
        this.router.navigate(['/activacion']);
        this.messageService.add({ severity: 'success', summary: 'Reenvío de clave', detail: 'Se a enviado un correo con su clave de activación.' });
      } else { this.messageService.add({ severity: 'error', summary: 'Server', detail: "El correo no se encuentra registrado" }); }

    },
      error => {
        //console.log("error: ",error)
        this.messageService.add({ severity: 'error', summary: 'Server', detail: error.message });
      });
  }

}

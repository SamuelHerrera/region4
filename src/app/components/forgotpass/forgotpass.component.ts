import { Component, OnInit, ViewChild } from '@angular/core';
import { MailService } from '../../services/mail.service';
import { ClientService } from '../../services/client.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  @ViewChild('f') form: any;
  constructor(private mails: MailService, private clients: ClientService, private messageService: MessageService) { }

  ngOnInit() {

  }

  recuperarContrasena() {

    
    this.clients.getClientsByMail(this.form.form.controls.correo.value).subscribe((cliente: any) => {
      //console.log(cliente);
      
      if (cliente.data.docs!= "" && (cliente.data.docs[0].mail === this.form.form.controls.correo.value)) {
        const pass = cliente.data.docs[0].password;

        this.mails.sendMail({ to: this.form.form.controls.correo.value, text: "Su contraseña es: " + pass, subject: "Recuperación de contraseña" }).subscribe((response: any) => {
          //console.log("Response", response);
          
        });
        this.messageService.add({ severity: 'success', summary: 'Recuperación de contraseña', detail: 'Se a enviado un correo con su contraseña.' }); 
      } else { this.messageService.add({ severity: 'error', summary: 'Server', detail: "El correo no se encuentra registrado" }); }

    },
      error => {
        //console.log("error: ",error)
        this.messageService.add({ severity: 'error', summary: 'Server', detail: error.message });
      });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-activacion-usuario',
  templateUrl: './activacion-usuario.component.html',
  styleUrls: ['./activacion-usuario.component.css']
})
export class ActivacionUsuarioComponent implements OnInit {

  @ViewChild('f') form: any;

  constructor(private clientService: ClientService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }

  activar() {
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
    this.clientService.activateClient(form.Clave).subscribe(reponse => {
      this.router.navigate(['/iniciosesion']);
      this.messageService.add({ severity: 'success', summary: 'Activación', detail: "Usuario activado satisfactoriamente." });
    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Server', detail: error.error.message });        
      });
  }

}

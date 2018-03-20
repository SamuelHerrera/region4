import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ObservablesService } from '../../services/observables.service';

@Component({
  selector: 'app-inicio-de-sesion',
  templateUrl: './inicio-de-sesion.component.html',
  styleUrls: ['./inicio-de-sesion.component.css']
})
export class InicioDeSesionComponent implements OnInit {


  @ViewChild('f') form: any;

  constructor(private observableService: ObservablesService,
    private clientService: ClientService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.observableService.announceUserUpdate(null);
  }

  login() {
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

  public change(val) {
    console.log(val)
    this.observableService.announceStoreUpdate(val);
  }

  public onSubmit(form) {
    this.clientService.loginClient(form.Correo, form.Contrasena).subscribe((response: any) => {
      if (response.status === 200) {
        this.observableService.announceUserUpdate(response.data);
        this.messageService.add({ severity: 'success', summary: 'Inicio de sesion', detail: "Usuario inicio sesion satisfactoriamente." });
        this.router.navigate(['/generaravaluo']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Inicio de sesion', detail: response.message });
      }
    },
      error => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Server', detail: error.message });
      });

  }
}

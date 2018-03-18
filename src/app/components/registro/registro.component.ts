import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from "@angular/router";
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public ramos: any[] = [
    { name: 'Agente Inmobiliario Independiente', code: 'AII' },
    { name: 'Estudiante', code: 'E' },
    { name: 'Dueño', code: 'D' },
    { name: 'Propietario', code: 'P' }
  ];

  @ViewChild('f') form: any;

  constructor(private router: Router, private messageService: MessageService, private clientService: ClientService) { }

  ngOnInit() {
  }

  register() {
    if (this.form.form.valid) {
      this.form.ngSubmit.emit();
      return true;
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
    console.log(form);
    const client: Client = new Client();
    client.name = form.Nombre;
    client.activationCode = uuid();
    client.facturacion = {};
    client.mail = form.Correo;
    client.password = form.Contrasena;
    client.phone = form.Telefono;
    client.ramo = form.Ramo ? form.Ramo.name : "";
    client.status = "created";
    this.clientService.registerClient(client).subscribe(response => {
      this.router.navigate(['/activacion']);
      this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: "Usuario creado satisfactoriamente." });
    },
      error => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Server', detail: error.error.message });
      });
  }
}

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

  selectedValue: string[] = [];
  cliente: any = {};
  isHidden = false;

  public ramos: any[] = [
    { name: 'Agente Inmobiliario Independiente', code: 'AII' },
    { name: 'Agente Inmobiliario', code: 'AI' },
    { name: 'Propietario Inmobiliario', code: 'PI' },
    { name: 'Estudiante', code: 'E' },
    { name: 'Particular', code: 'PA' }
  ];

  @ViewChild('f') form: any;

  controlContrasena: FormControl;
  controlRepeatContrasena: FormControl

  constructor(private router: Router, private messageService: MessageService, private clientService: ClientService) { }

  ngOnInit() {
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  register() {

    if (this.form.form.valid && (this.form.form.get("Correo") !== "" &&
      this.form.form.get("Contrasena") !== "" && this.form.form.get("Nombre") !== "" &&
      this.form.form.get("Repetir") !== "" && this.form.form.get("Telefono") !== "" &&
      this.form.form.get("Ramo") !== "Ramo")) {

      this.controlContrasena = this.form.form.get("Contrasena");
      this.controlRepeatContrasena = this.form.form.get("Repetir");

      if (this.controlContrasena.value !== this.controlRepeatContrasena.value) {
        this.messageService.add({ severity: 'error', summary: 'Validacion', detail: ('Las contraseñas no coinciden.') });
        return false;
      } else {
        this.form.ngSubmit.emit();
        return true;
      }

      /*else {
        // tslint:disable-next-line:max-line-length
        //const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const re = /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/ ;
        const valid = re.test(String(this.form.form.get("Correo")).toLowerCase());
        console.log("Valid", valid);
        if (valid) {
          this.form.ngSubmit.emit();
          return true;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Validacion', detail: ('Correo no tiene un formato valido.') });
          return false;
        }

      }*/
    } else {
      Object.keys(this.form.form.controls).forEach(field => {
        const control: FormControl = this.form.form.get(field);
        control.markAsTouched({ onlySelf: true });
        control.markAsPristine({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
        if (field === "Contrasena") {
          this.controlContrasena = this.form.form.get(field);
        }
        if (field === "Repetir") {
          this.controlRepeatContrasena = this.form.form.get(field);
        }
        if (!control.valid) {
          this.messageService.add({ severity: 'error', summary: 'Validacion', detail: ('Campo ' + field + ' es incorrecto.') });
        }
      });

      if (this.controlContrasena.value !== this.controlRepeatContrasena.value) {

        this.messageService.add({ severity: 'error', summary: 'Validacion', detail: ('Las contraseñas no coinciden.') });
      }


    }
    return false;
  }

  public onSubmit(form) {
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
      this.cliente['name'] = client.name;
      this.cliente['key'] = client.activationCode;


      this.router.navigate(['/activacion']);
      this.messageService.add({ severity: 'success', summary: 'Bienvenido', detail: "Usuario creado satisfactoriamente." });
    },
      error => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Server', detail: error.error.message });
      });
  }
}

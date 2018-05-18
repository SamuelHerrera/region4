import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../../services/client.service';
import { ObservablesService } from '../../services/observables.service';
import { Router } from '@angular/router';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Client } from '../../models/client.model';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public ramos: any[] = [
    { name: 'Agente Inmobiliario Independiente', code: 'AII' },
    { name: 'Agente Inmobiliario', code: 'AI' },
    { name: 'Propietario Inmobiliario', code: 'PI' },
    { name: 'Estudiante', code: 'E' },
    { name: 'Particular', code: 'PA' }
  ];

  selectedValue: string[] = [];
  cliente: any = {};
  isHidden = false;

  nombreFormControl = new FormControl('', [
    Validators.required
  ]);

  apellidoFormControl = new FormControl('', [
    Validators.required
  ]);

  telefonoFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passFormControl = new FormControl('', [
    Validators.required
  ]);

  confirmFormControl = new FormControl('', (control: AbstractControl): { [key: string]: any } => {
    const value: any = control.value;
    const otherValue: any = this.passFormControl.value;
    return otherValue === value ? null : { 'notEquals': { value, otherValue } };
  });

  ramoFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public snackBar: MatSnackBar,
    private clientService: ClientService,
    private observableService: ObservablesService,
    private router: Router) { }

  ngOnInit() {
  }

  public register() {
    const client: Client = new Client();
    client.name = this.nombreFormControl.value + ' ' + this.apellidoFormControl.value;
    let code = '' + uuid();
    code = code.substring(0, 7);
    client.activationCode = code;
    client.facturacion = {};
    client.mail = this.emailFormControl.value;
    client.password = this.passFormControl.value;
    client.phone = this.telefonoFormControl.value;
    client.ramo = this.ramoFormControl.value ? this.ramoFormControl.value : '';
    client.status = 'created';
    this.clientService.registerClient(client).subscribe(response => {
      this.cliente['name'] = client.name;
      this.cliente['key'] = client.activationCode;

      this.router.navigate(['/activacion']);
      this.snackBar.open('Usuario creado satisfactoriamente.', 'Ok', {
        duration: 3000,
      });
    },
      error => {
        console.log(error);
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000,
        });
      });
  }

}

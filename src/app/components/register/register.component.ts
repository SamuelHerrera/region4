import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../../services/client.service';
import { ObservablesService } from '../../services/observables.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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

  constructor(public snackBar: MatSnackBar,
    private clientService: ClientService,
    private observableService: ObservablesService,
    private router: Router) { }

  ngOnInit() {
  }

}

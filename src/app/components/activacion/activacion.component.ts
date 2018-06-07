import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ObservablesService } from '../../services/observables.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activacion',
  templateUrl: './activacion.component.html',
  styleUrls: ['./activacion.component.css']
})
export class ActivacionComponent implements OnInit {

  codigoFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private observableService: ObservablesService,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.codigoFormControl.setValue(params['codigo']);
    });
  }

  public activar() {
    this.clientService.activateClient(this.codigoFormControl.value).subscribe(reponse => {
      this.router.navigate(['/sesion']);
      this.snackBar.open('Usuario activado satisfactoriamente.', 'Ok', {
        duration: 3000,
      });
    },
      error => {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000,
        });
      });
  }

}

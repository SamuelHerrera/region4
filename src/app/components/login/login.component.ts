import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ObservablesService } from '../../services/observables.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  public login() {
    this.clientService.loginClient(this.emailFormControl.value, this.passFormControl.value).subscribe((response: any) => {
      if (response.status === 200) {
        this.observableService.announceUserUpdate(response.data);
        this.router.navigate(['/generaravaluo']);
      } else {
        this.snackBar.open(response.message, 'Ok', {
          duration: 2000,
        });
      }
    },
      error => {
        this.snackBar.open(error.message, 'Ok', {
          duration: 10000,
        });
      });
  }

}

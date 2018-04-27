import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/client.model';
import { Router } from '@angular/router';
import { ObservablesService } from '../../services/observables.service';
import { ClientService } from '../../services/client.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: Client = new Client();
  display = false;
  @ViewChild('f') form: any;

  constructor(private messageService: MessageService, private clientService: ClientService, private observableService: ObservablesService, private router: Router) { }

  ngOnInit() {
    this.observableService.userObservable$.subscribe(user => {
      this.user = user ? user : new Client();
    });
  }

  showDialog() {
    this.display = true;
  }

  logout() {
    this.router.navigate(['/iniciosesion']);
  }

  public onSubmit(form) {
    this.clientService.loginClient(form.Correo, form.Contrasena).subscribe((response: any) => {
      if (response.status === 200) {
        this.observableService.announceUserUpdate(response.data);
        this.messageService.add({ severity: 'success', summary: 'Inicio de sesion', detail: "Usuario inicio sesion satisfactoriamente." });
        this.display = false;
        this.router.navigate(['/generaravaluo']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Inicio de sesion', detail: response.message });
      }
    },
      error => {
        console.log(error)
        this.display = false;
        this.messageService.add({ severity: 'error', summary: 'Server', detail: error.message });
      });

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

}

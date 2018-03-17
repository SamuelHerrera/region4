import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from "@angular/router";

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

  constructor(private router: Router, private messageService: MessageService) { }

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
    this.router.navigate(['/activacion']);
  }

}

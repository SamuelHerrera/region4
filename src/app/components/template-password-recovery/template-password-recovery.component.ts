import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-password-recovery',
  templateUrl: './template-password-recovery.component.html',
  styleUrls: ['./template-password-recovery.component.css']
})
export class TemplatePasswordRecoveryComponent implements OnInit {

  @Input() cliente: any = {};
  name: any;
  password: any;

  constructor() { }

  ngOnInit() {
    //console.log(this.cliente.data.docs[0].password);
    // if (this.cliente) {
    //   this.name = this.cliente.data.docs[0].name;
    //   this.password = this.cliente.data.docs[0].password;
    // }
  }

}

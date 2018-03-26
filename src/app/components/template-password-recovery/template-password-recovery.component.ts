import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-password-recovery',
  templateUrl: './template-password-recovery.component.html',
  styleUrls: ['./template-password-recovery.component.css']
})
export class TemplatePasswordRecoveryComponent implements OnInit {

  @Input() cliente: any = {};
  
  constructor() { }

  ngOnInit() {
    console.log(this.cliente);
  }

}

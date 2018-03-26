import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-user-activation',
  templateUrl: './template-user-activation.component.html',
  styleUrls: ['./template-user-activation.component.css']
})
export class TemplateUserActivationComponent implements OnInit {

  @Input() cliente: any = {};
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  url = 'https://www.valorinmuebles.com.mx/landing';

  constructor() { }

  ngOnInit() {
  }

  loaded() {
    console.log('loaded');
  }

}

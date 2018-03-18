import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('usuario')));
  }

}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { YalsService } from './services/yals.service';
import { YalsRequest } from './models/yals.model';
import { PagofacilService } from './services/pagofacil.service';
import { Pagofacilrequest } from './models/pagofacil.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {


  }

}

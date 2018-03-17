import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      console.log(response);
    })
  }

}

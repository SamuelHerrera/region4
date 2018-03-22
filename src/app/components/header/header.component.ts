import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';
import { Router } from '@angular/router';
import { ObservablesService } from '../../services/observables.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: Client = new Client();

  constructor(private observableService: ObservablesService, private router: Router) { }

  ngOnInit() {
    this.observableService.userObservable$.subscribe(user => {
      this.user = user ? user : new Client();
    });
  }

  logout() {
    this.router.navigate(['/iniciosesion']);
  }

}

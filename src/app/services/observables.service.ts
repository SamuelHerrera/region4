import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ObservablesService {

  constructor() { }

  public currentUser = JSON.parse(localStorage.getItem('usuario'));
  private userSource = new BehaviorSubject<any>(this.currentUser);
  public userObservable$ = this.userSource.asObservable();
  public announceUserUpdate(data) {
    this.currentUser = data
    if (!data) {
      localStorage.removeItem('usuario');
    } else {
      localStorage.setItem('usuario', JSON.stringify(data));
    }
    this.userSource.next(data);
  }

}

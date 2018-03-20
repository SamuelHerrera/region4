import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ObservablesService {

  constructor() { }
  
  public storeInfo = false;
  private storeInfoSource = new BehaviorSubject<any>(this.storeInfo);
  public storeInfoObservable$ = this.storeInfoSource.asObservable();

  public currentUser = JSON.parse(localStorage.getItem('usuario'));
  private userSource = new BehaviorSubject<any>(this.currentUser);
  public userObservable$ = this.userSource.asObservable();


  public announceUserUpdate(data) {

    if (this.storeInfo) {
      if (!data) {
        localStorage.removeItem('usuario');
      } else {
        localStorage.setItem('usuario', JSON.stringify(data));
      }
    } else {
      if (!data) {
        sessionStorage.removeItem('usuario');
      } else {
        sessionStorage.setItem('usuario', JSON.stringify(data));
      }
    }

    this.currentUser = data
    this.userSource.next(data);
  }

  public announceStoreUpdate(data) {
    this.storeInfo = data
    this.storeInfoSource.next(data);
  }

}

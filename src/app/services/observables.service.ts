import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ObservablesService {

  constructor() { }

  public storeInfo = false;
  private storeInfoSource = new BehaviorSubject<any>(this.storeInfo);
  public storeInfoObservable$ = this.storeInfoSource.asObservable();

  private userA = localStorage.getItem('usuario');
  private userB = sessionStorage.getItem('usuario');

  public currentUser = JSON.parse(this.userA || this.userB);
  private userSource = new BehaviorSubject<any>(this.currentUser);
  public userObservable$ = this.userSource.asObservable();


  public announceUserUpdate(data) {


    if (!data) {
      localStorage.removeItem('usuario');
      sessionStorage.removeItem('usuario');
    } else {
      if (this.storeInfo) {
        localStorage.setItem('usuario', JSON.stringify(data));
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

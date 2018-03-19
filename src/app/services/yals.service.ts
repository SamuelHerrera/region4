import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client.model';
import { YalsRequest } from '../models/yals.model';

@Injectable()
export class YalsService {

  constructor(private _http: HttpClient) { }

  getRequest() {
    return this._http.get("/api/yals");
  }

  generateRequest(yals: YalsRequest, cuponid: String) {
    const client = JSON.parse(localStorage.getItem('usuario'))
    return this._http.post("/api/yals", { clientid: client._id, yals_request: yals, cuponid: cuponid });
  }

}

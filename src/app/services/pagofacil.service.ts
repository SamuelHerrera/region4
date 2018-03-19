import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Pagofacilrequest } from '../models/pagofacil.model';

@Injectable()
export class PagofacilService {

  constructor(private _http: HttpClient) { }

  getPagos() {
    return this._http.get("/api/pagofacil");
  }

  generatePago(pagofacilreq: Pagofacilrequest) {
    const client = JSON.parse(localStorage.getItem('usuario'))
    return this._http.post("/api/pagofacil", { clientid: client._id, pagofacil_request: pagofacilreq });
  }

  addReportReference(pagofacilid: String, yalsid: String) {
    return this._http.put("/api/pagofacil", { id: pagofacilid, yalsid: yalsid });
  }

}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Pagofacilrequest } from '../models/pagofacil.model';
import { ObservablesService } from './observables.service';

@Injectable()
export class PagofacilService {

  constructor(private observ: ObservablesService, private _http: HttpClient) { }

  getPagos() {
    return this._http.get("/api/pagofacil");
  }

  getPagosByToken(token) {
    return this._http.get("/api/pagofacil?request=" + token);
  }

  generatePago(pagofacilreq: Pagofacilrequest) {
    const client = this.observ.currentUser;
    return this._http.post("/api/pagofacil", { clientid: client._id, pagofacil_request: pagofacilreq });
  }

  generatePagoPayPal(token?, payerid?, amount?) {
    const client = this.observ.currentUser;
    return this._http.post("/api/processpaypal", { amount: amount, clientid: client._id, token: token, payerid: payerid });
  }
  addReportReference(pagofacilid: String, yalsid: String) {
    return this._http.put("/api/pagofacil", { id: pagofacilid, yalsid: yalsid });
  }

}

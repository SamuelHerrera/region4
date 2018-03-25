import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { YalsRequest } from '../models/yals.model';
import { ObservablesService } from './observables.service';

@Injectable()
export class YalsService {

  constructor(private obsv: ObservablesService, private _http: HttpClient) { }

  getRequest() {
    return this._http.get("/api/yals");
  }

  urlToBase64(url) {
    return this._http.post("/api/yals/convert", { url: url });
  }

  generateRequest(yals: YalsRequest, cuponid: String) {
    const client = this.obsv.currentUser;
    return this._http.post("/api/yals", { clientid: client._id, yals_request: yals, cuponid: cuponid });
  }

  getCoords(avaluoForm: any) {
    // tslint:disable-next-line:max-line-length
    return this._http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${avaluoForm['street']}+${avaluoForm['num_ext']}+${avaluoForm['colonia']},+${avaluoForm['municipio']}+${avaluoForm['estado']}&key=AIzaSyBYcMrK6MOhpjQ93Cg1BeN8RkGAb5KFHhc`);
  }

  getConfigs() {
    return this._http.get("/api/yals/configuracion");
  }
  setConfigs(url, mail, key) {
    return this._http.post("/api/yals", { url: url, mail: mail, cuponid: key });
  }

}

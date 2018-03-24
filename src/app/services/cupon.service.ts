import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { YalsRequest } from '../models/yals.model';
import { ObservablesService } from './observables.service';

@Injectable()
export class CuponService {

  constructor(private obsv: ObservablesService, private _http: HttpClient) { }

  getCupons() {
    return this._http.get("/api/cupon");
  }

  getCuponByName(name) {
    return this._http.get("/api/cupon?nombre=" + name);
  }

  getCuponById(id) {
    return this._http.get("/api/cupon?_id=" + id);
  }

  generateCupon(campana, porcentaje, nombre, descripcion, estado) {
    return this._http.post("/api/cupon", {
      campana: campana, porcentaje: porcentaje, nombre: nombre,
      descripcion: descripcion, estado: estado
    });
  }

  changeStatus(id, status) {
    const client = this.obsv.currentUser;
    return this._http.put("/api/cupon", { id: id, estado: status });
  }

}

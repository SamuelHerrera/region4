import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client.model';

@Injectable()
export class ClientService {

  constructor(private _http: HttpClient) { }

  getClients() {
    return this._http.get("/api/client");
  }
  getClientsByMail(mail) {
    return this._http.get("/api/client?mail=" + mail);
  }

  registerClient(client: Client) {
    return this._http.post("/api/client", client);
  }

  activateClient(clave: string) {
    return this._http.put("/api/client/activate/", { clave: clave });
  }

  loginClient(user: string, pass: string) {
    return this._http.post("/api/client/login/", { user: user, pass: pass });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MailService {

  constructor(private _http: HttpClient) { }

  sendMail(mail) {
    return this._http.post('/api/sendmail', mail);
  }

}

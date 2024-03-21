import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaludoService {

  constructor(private httpClient: HttpClient) { }

  getTest() : Observable<any> {
    return this.httpClient.get(environment.baseUrlSaludo + environment.apiSaludoTest);
  }

  getSaludo() : Observable<any> {
    return this.httpClient.get(environment.baseUrlSaludo + environment.apiSaludoSaludar);
  }

}

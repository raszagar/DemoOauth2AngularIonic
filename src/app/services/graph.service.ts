import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private httpClient: HttpClient) { }

  getProfile() : Observable<any> {
    return this.httpClient.get(environment.baseUrlGraph + environment.apiGraphMe);
  }
}

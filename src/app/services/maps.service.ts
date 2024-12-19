import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { dataExchange } from '../interfaces/dataexchange';
import { AmrMap } from '../interfaces/map';



@Injectable({
  providedIn: 'root',
})
export class MapsService {
  constructor(private http: HttpClient) {}
  public helloworld(): Observable<string> {
    return this.http.get<string>(environment.apiurl + 'api/helloworld/');
  }
  public all(): Observable<dataExchange<AmrMap[]>> {
    return this.http.get<dataExchange<AmrMap[]>>(
      environment.apiurl + 'api/maps/all'
    );
  }
  public map(): Observable<dataExchange<string>> {
    return this.http.get<dataExchange<string>>(
      environment.apiurl + 'api/maps/map'
    );
  }
}

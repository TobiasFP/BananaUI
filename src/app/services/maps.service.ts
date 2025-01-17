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
  base: string = 'api/v1/maps';
  constructor(private http: HttpClient) {}
  public helloworld(): Observable<string> {
    return this.http.get<string>(environment.apiurl + 'api/helloworld/');
  }
  public all(): Observable<dataExchange<AmrMap[]>> {
    return this.http.get<dataExchange<AmrMap[]>>(
      environment.apiurl + this.base + '/all'
    );
  }
  public map(id: string): Observable<dataExchange<string>> {
    return this.http.get<dataExchange<string>>(
      environment.apiurl + this.base + '/' + id
    );
  }

  // In order to upload a file, using FormData is much simpler.
  public Add(amrMap: FormData): Observable<dataExchange<AmrMap>> {
    return this.http.post<dataExchange<AmrMap>>(
      environment.apiurl + this.base + '/',
      amrMap
    );
  }
}

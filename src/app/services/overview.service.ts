import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { State } from '../interfaces/amr';
import { dataExchange } from '../interfaces/dataexchange';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  constructor(private http: HttpClient) {}
  public helloworld(): Observable<string> {
    return this.http.get<string>(environment.apiurl + 'api/helloworld/');
  }
  public amrs(): Observable<dataExchange<Array<State>>> {
    return this.http.get<dataExchange<Array<State>>>(
      environment.apiurl + 'api/amrs/all'
    );
  }
  public amr(serialNumber: string): Observable<dataExchange<State>> {
    return this.http.get<dataExchange<State>>(
      environment.apiurl + 'api/amrs/info?SN=' + serialNumber
    );
  }
}

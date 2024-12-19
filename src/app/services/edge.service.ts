import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { State } from '../interfaces/amr';
import { dataExchange } from '../interfaces/dataexchange';
import { Edge, Node } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  base: string = 'api/edge';
  constructor(private http: HttpClient) {}

  public all(): Observable<dataExchange<Edge[]>> {
    return this.http.get<dataExchange<Edge[]>>(
      environment.apiurl + this.base + '/all'
    );
  }
  public create(edge: Edge): Observable<dataExchange<Edge>> {
    return this.http.post<dataExchange<Edge>>(
      environment.apiurl + this.base,
      edge
    );
  }
}

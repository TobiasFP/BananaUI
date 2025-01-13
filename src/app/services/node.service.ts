import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { State } from '../interfaces/amr';
import { dataExchange } from '../interfaces/dataexchange';
import { Node, NodeMeta } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  base: string = 'api/v1/nodes';
  constructor(private http: HttpClient) {}

  public all(): Observable<dataExchange<NodeMeta[]>> {
    return this.http.get<dataExchange<NodeMeta[]>>(
      environment.apiurl + this.base + '/all'
    );
  }
  public create(node: NodeMeta): Observable<dataExchange<NodeMeta>> {
    return this.http.post<dataExchange<NodeMeta>>(
      environment.apiurl + this.base + '/',
      node
    );
  }
}

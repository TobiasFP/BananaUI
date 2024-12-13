import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { State } from '../interfaces/amr';
import { dataExchange } from '../interfaces/dataexchange';
import { Node } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  base: string = 'api/nodes';
  constructor(private http: HttpClient) {}

  public all(): Observable<dataExchange<Array<Node>>> {
    return this.http.get<dataExchange<Array<Node>>>(
      environment.apiurl + this.base + '/all'
    );
  }
  public create(node: Node): Observable<dataExchange<Node>> {
    return this.http.post<dataExchange<Node>>(
      environment.apiurl + this.base + "/",
      node
    );
  }
}

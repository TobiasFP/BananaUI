import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { dataExchange } from '../interfaces/dataexchange';
import { NodeMeta } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  base: string = 'api/v1/nodes';
  constructor(private http: HttpClient) {}

  public all(mapID: string = ''): Observable<dataExchange<NodeMeta[]>> {
    let appendMapID = '';
    if (mapID !== '') {
      appendMapID = '/' + mapID;
    }
    console.log('appendMapID');
    console.log(appendMapID);
    return this.http.get<dataExchange<NodeMeta[]>>(
      environment.apiurl + this.base + '/all' + appendMapID
    );
  }
  public create(node: NodeMeta): Observable<dataExchange<NodeMeta>> {
    return this.http.post<dataExchange<NodeMeta>>(
      environment.apiurl + this.base + '/',
      node
    );
  }
}

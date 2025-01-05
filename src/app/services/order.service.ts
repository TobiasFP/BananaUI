import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { dataExchange } from '../interfaces/dataexchange';
import { NodeMeta, Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  base: string = 'api/orders';
  constructor(private http: HttpClient) {}

  public all(): Observable<dataExchange<Order[]>> {
    return this.http.get<dataExchange<Order[]>>(
      environment.apiurl + this.base + '/all'
    );
  }
  public create(node: NodeMeta): Observable<dataExchange<Order>> {
    return this.http.post<dataExchange<Order>>(
      environment.apiurl + this.base + '/',
      node
    );
  }
}

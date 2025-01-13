import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { dataExchange } from '../interfaces/dataexchange';
import {  Order, OrderTemplateDetails } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  base: string = 'api/v1/orders';
  constructor(private http: HttpClient) {}

  public all(): Observable<dataExchange<OrderTemplateDetails[]>> {
    return this.http.get<dataExchange<OrderTemplateDetails[]>>(
      environment.apiurl + this.base + '/all'
    );
  }
  public create(
    order: OrderTemplateDetails
  ): Observable<dataExchange<OrderTemplateDetails>> {
    return this.http.post<dataExchange<OrderTemplateDetails>>(
      environment.apiurl + this.base + '/',
      order
    );
  }
}

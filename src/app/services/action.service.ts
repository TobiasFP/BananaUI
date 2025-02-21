import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { dataExchange } from '../interfaces/dataexchange';
import { Action, ActionParameter, InstantAction } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  base: string = 'api/v1/actions';
  constructor(private http: HttpClient) {}

  public all(): Observable<dataExchange<Action[]>> {
    return this.http.get<dataExchange<Action[]>>(
      environment.apiurl + this.base + '/all'
    );
  }
  public create(action: Action): Observable<dataExchange<Action>> {
    return this.http.post<dataExchange<Action>>(
      environment.apiurl + this.base + '/',
      action
    );
  }

  public allActionParameters(): Observable<dataExchange<ActionParameter[]>> {
    return this.http.get<dataExchange<ActionParameter[]>>(
      environment.apiurl + this.base + '/allactionparameters'
    );
  }
  public createActionParameters(
    actionParam: ActionParameter
  ): Observable<dataExchange<ActionParameter>> {
    return this.http.post<dataExchange<ActionParameter>>(
      environment.apiurl + this.base + '/actionparameter',
      actionParam
    );
  }
  public allInstantActions(): Observable<dataExchange<InstantAction[]>> {
    return this.http.get<dataExchange<InstantAction[]>>(
      environment.apiurl + this.base + '/allinstantactions'
    );
  }
  public createInstantAction(
    instantAction: InstantAction
  ): Observable<dataExchange<InstantAction>> {
    return this.http.post<dataExchange<InstantAction>>(
      environment.apiurl + this.base + '/instantaction',
      instantAction
    );
  }
}

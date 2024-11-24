import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
export interface AuthResponseData {
  token: string;
  refreshtoken: string;
  idtoken: string;
  expires: number;
}

export interface AuthData {
  token: string;
  refreshtoken: string;
  expires: number;
  idtoken?: string;
  userId?: string;
  realm_access?: Roles;
  groups?: Array<string>;
  name?: string;
  email?: string;
}
interface Roles {
  roles: Array<String>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get userIsAuthenticated(): Promise<Boolean> {
    return this.getAuthData().then(
      (data) => {
        if (data?.token) {
          return true;
        }
        return false;
      },
      () => {
        return false;
      }
    );
  }

  get isValidated(): Promise<boolean> {
    return this.getAuthData().then(
      (data) => {
        let validated = false;
        if (data) {
          if(data.realm_access && data.realm_access?.roles?.length > 0) {
            validated = true;
          }
        }
        return validated;
      },
      () => {
        return false;
      }
    );
  }

  constructor(private http: HttpClient) { }

  logoutApp(): void {
    this.clear();
  }

  public setToken(tokenData: AuthResponseData): Observable<boolean> {
    return this.storeAuthData(tokenData);
  }

  public clear() {
    this.storeAuthData(
      {
        token: '',
        refreshtoken: '',
        expires: 0,
        idtoken: '',
        userId: '',
        realm_access: { roles: [] },
        groups: [],
        name: '',
        email: '',
      }
    ).subscribe((res) => {
      console.log('Cleared data?');
      console.log(res);
    });
  }

  public storeAuthData(
    data: AuthData
  ): Observable<boolean> {
    Storage.set({ key: 'authData', value: JSON.stringify(data) });
    return of(true);
  }

  getToken(): Promise<string> {
    return this.getAuthData().then((data) => {
      if (data) {
        return data.token;
      }
      return '';
    });
  }

  async getUserID(): Promise<string> {
    const data = await this.getAuthData();

  if (data && data.userId && data.userId !== "") {
      return data.userId;
    }
    return '';
  }

  private getAuthData(): Promise<AuthData> {
    const nullAuthData: AuthData = {
          token: '',
          refreshtoken: '',
          expires: 0
    };
    return Storage.get({ key: 'authData' }).then(
      (storedData: { value: any }) => {
        if (!storedData?.value) {
          return nullAuthData;
        }
        const authData: AuthData = JSON.parse(storedData.value);

        if (authData.expires <= new Date().getTime() / 1000) {
          return nullAuthData;
        }
        return authData;
      },
      (err) => {
        console.log(err);

        return nullAuthData;
      }
    );
  }
}
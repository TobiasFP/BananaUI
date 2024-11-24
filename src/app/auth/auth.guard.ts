import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment } from '@angular/router';


interface resourceUrlRes {
  access_token: string;
  sub: string;
  groups?: Array<string>;
  realm_access?: string;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Promise<boolean> {
    return this.authService.userIsAuthenticated.then(
      (authenticated) => {
        if (authenticated) {
          return true;
        }
        window.open(environment.apiurl, '_self');
        return false;
      },
      (err) => {
        if (!environment.app) {
          console.log(
            'User is not logged in and cannot be logged in 2' + err
          );
          window.open(environment.apiurl, '_self');
        }
        return false;
      }
    );
  }
}

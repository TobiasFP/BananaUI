import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        if (!request.url.startsWith('https://gateway.saxobank.com')) {
          return next.handle(request);
        }
        if (token) {
          const clonedreq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`),
            body: request.body,
          });
          return next.handle(clonedreq);
        } else {
          return next.handle(request).pipe(
            tap(
              () => { },
              (err: any) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status !== 401) {
                    return;
                  }
                  console.log('Navigating to auth');
                  this.router.navigate(['/auth']);
                }
              }
            )
          );
        }
      })
    );
  }
}

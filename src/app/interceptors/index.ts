import { HttpTokenInterceptor } from './http-token-interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";


export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
]

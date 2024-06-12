import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { UserService } from '../Services/user.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(public auth: UserService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('/login')) {
      return next.handle(request);
    }
    request = request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken().toString()}`,
        // ContentType:
      }),
    });
    console.log('request = ', request);
    return next.handle(request);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OptionsInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set('Content-Type', `${(request.method == "POST") ? "application/vnd.api+json" : "application/json"}`)
              .set('Authorization', `Bearer ${localStorage.getItem("token")}`),
      withCredentials: false
    });

    return next.handle(request);
  }
}
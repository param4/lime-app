import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from '../../shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkuService {
  private url: string = `${environment.apiUrl}/api/skus`;

  constructor(private http: HttpClient, private eh: HttpErrorHandler) { }

  getSku(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  getSkus(page: number, pageSize: number): Observable<any[]> {
    return this.http.get<any[]>(
      this.url,
      {
        params: {
          'page': page.toString(),
          'pageSize': pageSize.toString()
        }
      })
      .pipe(catchError(this.eh.handleError));
  }
}

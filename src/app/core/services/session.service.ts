import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private url: string = `${environment.apiUrl}/session`;
  private isLoggedIn = new BehaviorSubject(false);

  loggedInStatus$ = this.isLoggedIn.asObservable();

  constructor(private http: HttpClient, private eh: HttpErrorHandler, private snackBar: MatSnackBar) { }

  setLoggedInStatus(status: boolean) {
    localStorage.setItem("isLogedIn", "1");
    this.isLoggedIn.next(status);
  }

  isCustomerLoggedIn(): any {
    return localStorage.getItem("isLogedIn");
  }

  logout(): string {
    localStorage.removeItem("isLoggedIn");
    this.snackBar.open('You have been logged out.', 'Close', { duration: 4000 });
    return "Logged Out Successfully.";
  }
}

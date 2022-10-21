import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OptionsInterceptor } from './core/interceptors/options.interceptor';
import { environment } from 'src/environments/environment';

import { CoreModule } from './core/core.module';

import { AuthModule } from './features/auth/auth.module';
import { ProductsModule } from './features/products/products.module';
import { CartModule } from './features/cart/cart.module';
import { CheckoutModule } from './features/checkout/checkout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    ProductsModule,
    CartModule,
    CheckoutModule,
    CoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OptionsInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (http: HttpClient) => () => http.post<object>(
        `${environment.apiUrl}/oauth/token`,
        { 
          'grant_type': 'client_credentials',
          "client_id" : environment.baseClientID,
          "client_secret" : environment.clientSecret
        },
        { withCredentials: false })
        .toPromise().then((data : any)=> {
          localStorage.setItem("token", data.access_token);
        }),
      multi: true,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

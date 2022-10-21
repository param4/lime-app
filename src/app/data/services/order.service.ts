import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { Order, GetOrderParams, UpdateOrderParams } from '../models/order';
import { Shipment } from '../models/shipment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string = `${environment.apiUrl}/api/orders`;

  constructor(
    private http: HttpClient,
    private eh: HttpErrorHandler) { }

  createOrder(): Observable<Order> {
    return this.http.post<Order>(this.url, {
      "data": {
        "type": "orders",
        "attributes": {
          "language_code": "it",
          market : {
            "id": "KgaJYhMDVl",
            "type": "markets",
            "links": {
                "self": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl"
            },
            "attributes": {
                "number": 11245,
                "name": "USA",
                "facebook_pixel_id": null,
                "checkout_url": null,
                "external_prices_url": null,
                "private": false,
                "created_at": "2022-09-13T18:11:31.950Z",
                "updated_at": "2022-09-13T18:11:31.950Z",
                "reference": "market_2",
                "reference_origin": "CLI",
                "metadata": {}
            },
            "relationships": {
                "merchant": {
                    "links": {
                        "self": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/relationships/merchant",
                        "related": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/merchant"
                    }
                },
                "price_list": {
                    "links": {
                        "self": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/relationships/price_list",
                        "related": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/price_list"
                    }
                },
                "inventory_model": {
                    "links": {
                        "self": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/relationships/inventory_model",
                        "related": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/inventory_model"
                    }
                },
                "tax_calculator": {
                    "links": {
                        "self": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/relationships/tax_calculator",
                        "related": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/tax_calculator"
                    }
                },
                "customer_group": {
                    "links": {
                        "self": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/relationships/customer_group",
                        "related": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/customer_group"
                    }
                },
                "attachments": {
                    "links": {
                        "self": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/relationships/attachments",
                        "related": "https://student-club-2.commercelayer.io/api/markets/KgaJYhMDVl/attachments"
                    }
                }
            },
            "meta": {
                "mode": "test",
                "organization_id": "OXNMWFKKWy"
            }
        }
        }
      }
    })
      .pipe(catchError(this.eh.handleError));
  }

  getOrder(id: string, orderParam: GetOrderParams): Observable<Order> {
    let params = {};
    if (orderParam != GetOrderParams.none) {
      params = { [orderParam]: 'true' };
    }

    return this.http.get<Order>(`${this.url}/${id}`, { params: params })
      .pipe(catchError(this.eh.handleError));
  }

  updateOrder(order: Order, params: UpdateOrderParams[]): Observable<Order> {
    let updateParams = [];
    for (const param of params) {
      updateParams.push(param.toString());
    }

    return this.http.patch<Order>(
      `${this.url}/${order.id}`,
      order,
      { params: { 'field': updateParams } }
    )
      .pipe(catchError(this.eh.handleError));
  }

  getOrderShipments(id: string): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.url}/${id}/shipments`)
      .pipe(catchError(this.eh.handleError));
  }
}

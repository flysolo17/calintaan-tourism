import { Injectable } from '@angular/core';
import { CaptureResponse } from '../models/CaptureResponse';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Order } from '../models/Order';
import { Transaction } from '../models/Transaction';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payment';
  private successUrl = 'http://localhost:4200/payment/success';
  private cancelUrl = 'http://localhost:4200/payment/cancel';
  constructor(private http: HttpClient) {}

  createOrder(transaction: Transaction): Observable<{ approveUrl: string }> {
    const order: Order = {
      id: transaction.id,
      userId: transaction.userId,
      items: transaction.items,
      currency: transaction.currency,
      cancelUrl: this.cancelUrl,
      successUrl: this.successUrl,
    };

    return this.http.post<{ approveUrl: string }>(
      `${this.apiUrl}/create`,
      order
    );
  }

  captureOrder(orderId: string): Observable<CaptureResponse> {
    return this.http.post<CaptureResponse>(
      `${this.apiUrl}/capture?orderId=${orderId}`,
      null
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/customers';

  constructor(private http: HttpClient) { }

  signupCustomer(customerData: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/customer/signup', customerData);
  }

  loginCustomer(credentials: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/customer/login', credentials);
  }

  getCustomerByPhoneNumber(phoneNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${phoneNumber}`);
  }
}

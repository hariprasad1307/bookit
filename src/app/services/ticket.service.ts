import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/api/tickets';

  constructor(private http: HttpClient) {}

  bookTicket(bookingDetails: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bookingDetails);
  }
}

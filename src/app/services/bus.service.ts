import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://localhost:3000/api/buses'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  addNewBus(busData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, busData);
  }

  getBusesByPhoneNumber(phoneNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?phoneNumber=${phoneNumber}`);
  }

  getBusByRegistrationNumber(registrationNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${registrationNumber}`);
  }

  updateBus(registrationNumber: string, updatedBus: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${registrationNumber}`, updatedBus);
  }

  deleteBus(registrationNumber: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${registrationNumber}`);
  }

  getBusesByOriginDestination(origin: string, destination: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?origin=${origin}&destination=${destination}`);
  }
}

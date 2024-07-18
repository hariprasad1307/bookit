import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/admin/signup';

  constructor(private http: HttpClient) { }

  signupAdmin(adminData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, adminData);
  }
  loginAdmin(credentials: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/admin/login', credentials);
  }
  

}

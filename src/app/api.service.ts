import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {
  private apiUrl = 'https://localhost:44366/api/Login'; // Gerçek API base URL

  constructor(private http: HttpClient) {}

  // getData metodu: /data endpoint'ine istek yapar
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }
}

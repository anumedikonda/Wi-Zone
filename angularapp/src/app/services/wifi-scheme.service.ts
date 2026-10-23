import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/api/api';
import { WifiScheme } from '../models/wifi-scheme.model';

@Injectable({ providedIn: 'root' })
export class WifiSchemeService {
  private baseUrl = api.baseUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  addWiFiScheme(scheme: WifiScheme): Observable<WifiScheme> {
    return this.http.post<WifiScheme>(`${this.baseUrl}/wifiScheme`, scheme, { headers: this.getHeaders() });
  }

  getWiFiSchemeById(id: number): Observable<WifiScheme> {
    return this.http.get<WifiScheme>(`${this.baseUrl}/wifiScheme/${id}`, { headers: this.getHeaders() });
  }

  getAllWiFiSchemes(): Observable<WifiScheme[]> {
    return this.http.get<WifiScheme[]>(`${this.baseUrl}/wifiScheme`, { headers: this.getHeaders() });
  }

  updateWiFiScheme(id: number, scheme: WifiScheme): Observable<WifiScheme> {
    return this.http.put<WifiScheme>(`${this.baseUrl}/wifiScheme/${id}`, scheme, { headers: this.getHeaders() });
  }

  deleteWiFiScheme(id: number): Observable<WifiScheme> {
    return this.http.delete<WifiScheme>(`${this.baseUrl}/wifiScheme/${id}`, { headers: this.getHeaders() });
  }
}
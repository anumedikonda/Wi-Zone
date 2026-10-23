// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { api } from 'src/api/api';
// import { WifiSchemeRequest } from '../models/wifi-scheme-request.model';


// @Injectable({ providedIn: 'root' })
// export class WifiSchemeRequestService {

//   private baseUrl = api.baseUrl;


//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token') || '';
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`
//     });
//   }


//   addWiFiRequest(request: WifiSchemeRequest): Observable<WifiSchemeRequest> {
//     return this.http.post<WifiSchemeRequest>(`${this.baseUrl}/wifiSchemeRequest`, request, { headers: this.getHeaders() });
//   }

//   getWiFiRequestById(id: number): Observable<WifiSchemeRequest> {
//     return this.http.get<WifiSchemeRequest>(`${this.baseUrl}/wifiSchemeRequest/${id}`, { headers: this.getHeaders() });
//   }

//   getAllWiFiRequests(): Observable<WifiSchemeRequest[]> {
//     return this.http.get<WifiSchemeRequest[]>(`${this.baseUrl}/wifiSchemeRequest`, { headers: this.getHeaders() });
//   }

//   getWiFiRequestsByUserId(userId: number): Observable<WifiSchemeRequest[]> {
//     return this.http.get<WifiSchemeRequest[]>(`${this.baseUrl}/wifiSchemeRequest/user/${userId}`, { headers: this.getHeaders() });
//   }

//   updateWiFiRequest(id: number, request: any): Observable<WifiSchemeRequest> {
//     return this.http.put<WifiSchemeRequest>(`${this.baseUrl}/wifiSchemeRequest/${id}`, request, { headers: this.getHeaders() });
//   }

//   deleteWiFiRequest(id: number): Observable<WifiSchemeRequest> {
//     return this.http.delete<WifiSchemeRequest>(`${this.baseUrl}/wifiSchemeRequest/${id}`, { headers: this.getHeaders() });
//   }
// }

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { api } from 'src/api/api';
import { WifiSchemeRequest } from '../models/wifi-scheme-request.model';

@Injectable({
  providedIn: 'root'
})
export class WifiSchemeRequestService {

  private readonly baseUrl = api.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) {}

  addWiFiRequest(
    request: WifiSchemeRequest
  ): Observable<WifiSchemeRequest> {
    return this.http.post<WifiSchemeRequest>(
      `${this.baseUrl}/wifiSchemeRequest`,
      request,
      {
        headers: this.getHeaders()
      }
    );
  }

  getWiFiRequestById(
    id: number
  ): Observable<WifiSchemeRequest> {
    return this.http.get<WifiSchemeRequest>(
      `${this.baseUrl}/wifiSchemeRequest/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  getAllWiFiRequests():
    Observable<WifiSchemeRequest[]> {
    return this.http.get<WifiSchemeRequest[]>(
      `${this.baseUrl}/wifiSchemeRequest`,
      {
        headers: this.getHeaders()
      }
    );
  }

  getWiFiRequestsByUserId(
    userId: number
  ): Observable<WifiSchemeRequest[]> {
    return this.http.get<WifiSchemeRequest[]>(
      `${this.baseUrl}/wifiSchemeRequest/user/${userId}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  updateWiFiRequest(
    id: number,
    request: WifiSchemeRequest
  ): Observable<WifiSchemeRequest> {
    return this.http.put<WifiSchemeRequest>(
      `${this.baseUrl}/wifiSchemeRequest/${id}`,
      request,
      {
        headers: this.getHeaders()
      }
    );
  }

  deleteWiFiRequest(
    id: number
  ): Observable<WifiSchemeRequest> {
    return this.http.delete<WifiSchemeRequest>(
      `${this.baseUrl}/wifiSchemeRequest/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  private getHeaders(): HttpHeaders {
    const token =
      localStorage.getItem('token') ?? '';

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
}
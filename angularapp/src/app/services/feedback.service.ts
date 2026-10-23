// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { api } from 'src/api/api';
// import { Feedback } from '../models/feedback.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class FeedbackService {
//   private baseUrl = api.baseUrl;

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token') || '';
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`
//     });
//   }

//   createFeedback(feedback: any): Observable<Feedback> {
//     return this.http.post<Feedback>(`${this.baseUrl}/feedback`, feedback, { headers: this.getHeaders() });
//   }

//   getFeedbackById(id: number): Observable<Feedback> {
//     return this.http.get<Feedback>(`${this.baseUrl}/feedback/${id}`, { headers: this.getHeaders() });
//   }

//   getAllFeedbacks(): Observable<Feedback[]> {
//     return this.http.get<Feedback[]>(`${this.baseUrl}/feedback`, { headers: this.getHeaders() });
//   }

//   getFeedbacksByUserId(userId: number): Observable<Feedback[]> {
//     return this.http.get<Feedback[]>(`${this.baseUrl}/feedback/user/${userId}`, { headers: this.getHeaders() });
//   }
 
//   deleteFeedback(id: number): Observable<Feedback> {
//     return this.http.delete<Feedback>(`${this.baseUrl}/feedback/${id}`, { headers: this.getHeaders() });
//   }
// }

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { api } from 'src/api/api';
import {
  CreateFeedbackRequest,
  Feedback
} from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private readonly baseUrl = api.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) {}

  createFeedback(
    feedback: CreateFeedbackRequest
  ): Observable<Feedback> {
    return this.http.post<Feedback>(
      `${this.baseUrl}/feedback`,
      feedback,
      {
        headers: this.getHeaders()
      }
    );
  }

  getFeedbackById(
    id: number
  ): Observable<Feedback> {
    return this.http.get<Feedback>(
      `${this.baseUrl}/feedback/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      `${this.baseUrl}/feedback`,
      {
        headers: this.getHeaders()
      }
    );
  }

  getFeedbacksByUserId(
    userId: number
  ): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      `${this.baseUrl}/feedback/user/${userId}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  deleteFeedback(
    id: number
  ): Observable<Feedback> {
    return this.http.delete<Feedback>(
      `${this.baseUrl}/feedback/${id}`,
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
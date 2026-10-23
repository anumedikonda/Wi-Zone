import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/api/api';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = api.baseUrl ;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  login(credentials: Login): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/login`, credentials);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { Credentials } from '../shared/models/credentials';
import { User } from '../shared/models/user';
import { JwtToken } from '../shared/models/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdminUser = false;
  currentUser: User;
  readonly loginUrl = 'http://localhost:8088/gift-rest-service/login';
  readonly userUrl = 'http://localhost:8088/gift-rest-service/api/v1/users';

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

  login(credentials: Credentials): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.loginUrl, credentials, { observe: 'response' });
  }

  logout(): void {
    this.currentUser = null;
    this.isAdminUser = false;
    sessionStorage.removeItem('authToken');
    console.log('Current user logged out');
    this.router.navigateByUrl('');
  }

  authorizeUser(token: string): void {
    sessionStorage.authToken = 'Bearer ' + token;
    const decodedToken = jwt_decode(token) as JwtToken;

    this.getUser(decodedToken.userId).subscribe(resp => {
      this.currentUser = resp.body;
      this.isAdminUser = this.currentUser.userRole === 'ADMIN';
      console.log('Current user:', this.currentUser);
    });
  }

  createUser(user: User): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.userUrl, user, { observe: 'response' });
  }

  getUser(userId: string): Observable<HttpResponse<User>> {
    const url = `${this.userUrl}/${userId}`;
    return this.http.get<User>(url, { observe: 'response' });
  }

}

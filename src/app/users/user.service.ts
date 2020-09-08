import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly loginUrl = 'http://localhost:8087/gift-rest-service/login';
  readonly userUrl = 'http://localhost:8087/gift-rest-service/api/v1/users';

  constructor(private http: HttpClient) { }

  login(credentials: Credentials) : Observable<HttpResponse<any>> {
    return this.http.post<any>(this.loginUrl, credentials, { observe: 'response' })
  }

  createUser(user: User) : Observable<HttpResponse<any>> {
    return this.http.post<any>(this.userUrl, user, { observe: 'response' });
  }
}

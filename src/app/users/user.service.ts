import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials'
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly loginUrl = 'http://localhost:8087/gift-rest-service/login';

  constructor(private http: HttpClient) { }

  login(credentials: Credentials) : Observable<HttpResponse<any>> {
    return this.http.post<any>(this.loginUrl, credentials, { observe: 'response' })
    // .pipe(catchError(err => {
    //   console.log(err.message);
    //   throw err;
    // } ));
  }
}

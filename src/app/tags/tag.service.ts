import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  readonly apiUrl = 'http://localhost:8087/gift-rest-service/api/v1/tags/';

  constructor(private http: HttpClient) { }

  getTags(page: number, size: number): Observable<Tag[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Tag[]>(this.apiUrl, { params }).pipe(
      map(data => data['tags']));
  }
}

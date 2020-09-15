import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tag } from '../shared/models/tag';
import { TagsData } from '../shared/models/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/api/v1/tags';
   }

  getTags(page: number, size: number): Observable<Tag[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<TagsData>(this.apiUrl, { params }).pipe(
      map(data => data.tags));
  }
}

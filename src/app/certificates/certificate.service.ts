import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Certificate } from '../models/certificate'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  certificates: Certificate[];
  readonly apiUrl = 'http://localhost:8088/gift-rest-service/api/v1/certificates/';

  constructor(private http: HttpClient) { }

  getCertificates(page: number, size: number, search: string = '', tag: string = '')
    : Observable<Certificate[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search)
      .set('tag', tag)
      .set('sort', '-creation_date');
    //TODO map data to Certificate class
    return this.http.get<Certificate[]>(this.apiUrl, { params })
  }
}

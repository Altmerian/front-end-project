import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap, filter, isEmpty, throwIfEmpty, count } from 'rxjs/operators';

import { Certificate } from '../shared/models/certificate'
import { NotFoundError } from '../shared/errors/notFoundError'

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  certificates$ = new Subject<Certificate[]>();
  searchTerm$ = new Subject<string>();
  searchCertificatesRef = this.searchCertificates.bind(this);
  readonly apiUrl = 'http://localhost:8087/gift-rest-service/api/v1/certificates';

  constructor(private http: HttpClient) { }

  getCertificates(page: number, size: number, search: string = '', tag: string = '')
    : Observable<Certificate[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search)
      .set('tag', tag)
      .set('sort', '-creation_date');
    return this.http.get<Certificate[]>(this.apiUrl, { params }).pipe(
      map(data => data['certificates']));
  };

  getCertificate(id: number): Observable<Certificate> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Certificate>(url).pipe(
      filter(cert => !cert.deleted),
      throwIfEmpty(() => new NotFoundError(`Certificate with id=${id} not found`)));
  }

  addCertificate(certificate: Certificate): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl, certificate, { observe: 'response' });
  }

  updateCertificate(certificate: Certificate): Observable<HttpResponse<any>> {
    const url = this.apiUrl + '/' + certificate.id;
    return this.http.put<any>(url, certificate, { observe: 'response' });
  }

  deleteCertificate(certificate: Certificate) {
    const url = this.apiUrl + '/' + certificate.id;
    return this.http.delete<any>(url).pipe(
      tap(_ => console.log(`deleted certificate id=${certificate.id}`)),
    );
  }

  searchCertificates(event: Event) {
    let search = (event.target as HTMLInputElement).value;

    this.getCertificates(1, 100, search).subscribe(data => {
      console.log(data);
      this.certificates$.next(data);
      if (search.trim()) {
        this.searchTerm$.next(`name or description: "${search.trim()}"`);
      } else {
        this.searchTerm$.next('');
      }
    });
    console.log('Searching certificates by: ' + search);
  }

  searchCertificatesByTag(tag: string) {
    this.getCertificates(1, 100, '', tag).subscribe(data => {
      console.log(data);
      this.certificates$.next(data);
      if (tag.trim()) {
        this.searchTerm$.next(`tag: "${tag.trim()}"`);
      } else {
        this.searchTerm$.next('');
      }
    });
  }
}

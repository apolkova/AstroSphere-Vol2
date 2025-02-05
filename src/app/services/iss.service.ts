import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssService {
  private apiUrl = 'http://api.open-notify.org/iss-now.json'; // API for current ISS location

  constructor(private http: HttpClient) {}

  getIssLocation(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
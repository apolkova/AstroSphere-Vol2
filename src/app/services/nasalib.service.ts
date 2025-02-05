import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasalibService {
  private apiUrl = 'https://images-api.nasa.gov/search';

  constructor(private http: HttpClient) {}

  searchMedia(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${query}&media_type=image`);
  }
}
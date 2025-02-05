import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsteroidsService {
  private apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed';

  constructor(private http: HttpClient) {}

  getAsteroids(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${environment.nasaApiKey}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApodService {
  private apiUrl = 'https://api.nasa.gov/planetary/apod';

  constructor(private http: HttpClient) {}

  getPictureOfTheDay(): Observable<any> {
    return this.http.get(`${this.apiUrl}?api_key=${environment.nasaApiKey}`);
  }

  getPictureByDate(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?date=${date}&api_key=${environment.nasaApiKey}`);
  }
}

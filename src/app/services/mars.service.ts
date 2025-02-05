import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarsService {
  private apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

  constructor(private http: HttpClient) {}

  getMarsPhotos(): Observable<any> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get(`${this.apiUrl}?earth_date=${today}&api_key=${environment.nasaApiKey}`);
  }

  getMarsPhotosBySol(sol: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?sol=${sol}&api_key=${environment.nasaApiKey}`);
  }
}

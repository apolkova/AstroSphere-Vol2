import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly apiUrl = 'https://api.spaceflightnewsapi.net/v4/articles';

  constructor(private http: HttpClient) {}

  fetchNews(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiUrl = 'http://stapi.co/api/v1/rest/movie/search';

  constructor(private http: HttpClient) {}

  fetchMovies(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

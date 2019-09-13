import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http: HttpClient;

  constructor( handler: HttpBackend) { 
     this.http = new HttpClient(handler);
  }

  list(): Observable<Array<Movie>> {
    let params = new HttpParams();
    params = params.append('api_key', '3661411c65331184ac73d8660d0b4648');
    params = params.append('language', 'en-US');
    params = params.append('page', '1');
    
    return this.http.get(`${environment.movieDB.host}/movie/now_playing`, { params })
      .pipe(
        map((response: any) => {
          console.log(response.results);
          return response.results;
        })
      );
  }

  get(id: string): Observable<Movie> {
    let params = new HttpParams();
    params = params.append('api_key', '3661411c65331184ac73d8660d0b4648');
    params = params.append('language', 'en-US');
    
    return this.http.get(`${environment.movieDB.host}/movie/${id}`, { params })
      .pipe(
        map((data: any) => {
          console.log(data);
          return data;
        })
      );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
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
    return this.http.get(`${environment.movieDB.host}/movie/now_playing?api_key=3661411c65331184ac73d8660d0b4648&language=en-US&page=1`)
      .pipe(
        map((response: any) => response.results)
      );
  }

}

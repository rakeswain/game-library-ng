import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { ApiResponse } from '../components/models/apiResponse';
import { Game } from '../components/models/game';
import { Screenshots } from '../components/models/screenshots';
import { Trailer } from '../components/models/trailer';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGamesList(ordering: string, search?: string): Observable<ApiResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    let URL: string = `${env.BASE_URL}/games`
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search',search);
    }

    return this.http.get<ApiResponse<Game>>(URL, { params });
  }

  getGameDetails(id: string): Observable<Game> {
    let gameInfoReq = this.http.get<Game>(`${env.BASE_URL}/games/${id}`);
    let gameTrailerReq = this.http.get<Trailer>(`${env.BASE_URL}/games/${id}/movies`);
    let gameScreenshortReq = this.http.get<Screenshots>(`${env.BASE_URL}/games/${id}/screenshots`);

    return forkJoin([gameInfoReq, gameScreenshortReq, gameTrailerReq]).pipe(
      map((resp: any) => {
        return {
          ...resp[0],
          screenshots: resp[1]?.results,
          trailers: resp[2]?.results
        }
      })
    );
  }
}

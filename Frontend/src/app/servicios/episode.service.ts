import { Injectable } from '@angular/core';
import { Episode, resultsEpi } from '../interfaces/episode';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private Url = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

  ObtenerEpisodios(): Observable<Episode> {
    return this.http.get<Episode>(this.Url);
  }
  obtenerEpisodiosFiltrados(filtros: { [key: string]: string }): Observable<Episode> {
    const queryParams = new URLSearchParams(filtros).toString();
    return this.http.get<Episode>(`${this.Url}/?${queryParams}`);
  }
}

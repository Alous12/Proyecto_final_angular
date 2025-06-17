import { Injectable } from '@angular/core';
import { Episode } from '../interfaces/episode';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private backendUrl = 'http://localhost:3000/episodes';

  constructor(private http: HttpClient) {}


  // Obtener todos los episodios desde el backend
  obtenerEpisodios(): Observable<Episode[]> {
    return this.http.get<Episode[]>(this.backendUrl);
  }

  // Obtener un episodio por ID desde el backend
  obtenerEpisodioPorId(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.backendUrl}/${id}`);
  }

  // Filtrar episodios desde el backend
  obtenerEpisodiosFiltrados(filtros: { [key: string]: string }): Observable<Episode[]> {
    const queryParams = new URLSearchParams(filtros).toString();
    return this.http.get<Episode[]>(`${this.backendUrl}/filter?${queryParams}`);
  }

  // Actualizar un episodio por ID
  actualizarEpisodio(id: number, data: Partial<Episode>): Observable<Episode> {
    return this.http.put<Episode>(`${this.backendUrl}/${id}`, data);
  }

  // Eliminar un episodio por ID
  eliminarEpisodio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/${id}`);
  }
}

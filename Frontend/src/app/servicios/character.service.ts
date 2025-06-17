import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private backendUrl = 'http://localhost:3000/characters';

  constructor(private http: HttpClient) { }

  obtenerMultiplesEpisodiosPorId(ids: number[]): Observable<any[]> {
    const idsString = ids.join(',');
    // Suponiendo que la ruta correcta para episodios es /episodes
    return this.http.get<any[]>(`http://localhost:3000/episodes/${idsString}`);
  }

  // Obtener todos los personajes desde el backend
  obtenerPersonajes(): Observable<Character[]> {
    return this.http.get<Character[]>(this.backendUrl);
  }

  // Obtener un personaje por ID desde el backend
  obtenerPersonajePorId(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.backendUrl}/${id}`);
  }

  // Filtrar personajes desde el backend
  obtenerPersonajesFiltrados(filtros: { [key: string]: string }): Observable<Character[]> {
    const queryParams = new URLSearchParams(filtros).toString();
    return this.http.get<Character[]>(`${this.backendUrl}/filter?${queryParams}`);
  }

  // Actualizar un personaje por ID
  actualizarPersonaje(id: number, data: Partial<Character>): Observable<Character> {
    return this.http.put<Character>(`${this.backendUrl}/${id}`, data);
  }

  // Eliminar un personaje por ID
  eliminarPersonaje(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/${id}`);
  }
}
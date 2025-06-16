import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character, results } from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  obtenerPersonajes(): Observable<Character> {
    return this.http.get<Character>(this.apiUrl);
  }

  obtenerPersonajePorId(id: number): Observable<results> {
    return this.http.get<results>(`${this.apiUrl}/${id}`);
    
  }

  obtenerPersonajesFiltrados(filtros: { [key: string]: string }): Observable<Character> {
    const queryParams = new URLSearchParams(filtros).toString();
    const url = `${this.apiUrl}/?${queryParams}`;
    return this.http.get<Character>(url);
  }

  obtenerMultiplesEpisodiosPorId(ids: number[]): Observable<any> {
  const idsString = ids.join(',');
  return this.http.get<any>(`https://rickandmortyapi.com/api/episode/${idsString}`);
  }

  
}
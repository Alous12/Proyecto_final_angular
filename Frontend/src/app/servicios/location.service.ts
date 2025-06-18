import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { Location } from '../interfaces/location';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // Cambia la URL base para apuntar a tu backend
  private backendUrl = 'https://proyecto-final-angular-mbso.onrender.com/locations';

  constructor(private http:HttpClient) { }

  obtenerPersonajesDeUbicacion(characterUrls: string[]): Observable<any[]> {
    const requests = characterUrls.map(url => this.http.get<any>(url));
    return requests.length ? forkJoin(requests) : of([]);
  }

  // Obtener todas las ubicaciones desde el backend
  obtenerUbicaciones(): Observable<Location[]> {
    return this.http.get<Location[]>(this.backendUrl);
  }

  // Obtener una ubicación por ID desde el backend
  obtenerUbicacionPorId(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.backendUrl}/${id}`);
  }

  // Filtrar ubicaciones desde el backend
  obtenerUbicacionesFiltradas(filtros: { [key: string]: string }): Observable<Location[]> {
    const queryParams = new URLSearchParams(filtros).toString();
    return this.http.get<Location[]>(`${this.backendUrl}/filter?${queryParams}`);
  }

  // Actualizar una ubicación por ID
  actualizarUbicacion(id: number, data: Partial<Location>): Observable<Location> {
    return this.http.put<Location>(`${this.backendUrl}/${id}`, data);
  }

  // Eliminar una ubicación por ID
  eliminarUbicacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/${id}`);
  }

  crearUbicacion(data: Location): Observable<Location> {
    return this.http.post<Location>(this.backendUrl, data);
  }
}

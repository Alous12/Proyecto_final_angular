import { Component, inject } from '@angular/core';
import { LocationComponent } from '../../elementos/location/location.component';
import { LocationService } from '../../servicios/location.service';
import { resultUbi } from '../../interfaces/location';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [LocationComponent, FormsModule],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.scss'
})
export class UbicacionComponent {
  ListadoUbicaciones: resultUbi[] = [];

  name = '';
  type = '';
  dimension = '';

  locationService: LocationService = inject(LocationService);

  constructor() {
    this.locationService.obtenerUbicaciones().subscribe(data => {
      this.ListadoUbicaciones = data['results'];
    });
  }

  buscar() {
    const filtros: any = {};
    if (this.name) filtros.name = this.name;
    if (this.type) filtros.type = this.type;
    if (this.dimension) filtros.dimension = this.dimension;

    this.locationService.obtenerUbicacionesFiltradas(filtros)
      .subscribe(data => {
        this.ListadoUbicaciones = data['results'];
      });
  }
}

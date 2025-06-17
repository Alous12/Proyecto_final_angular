import { Component, inject } from '@angular/core';
import { LocationComponent } from '../../elementos/location/location.component';
import { LocationService } from '../../servicios/location.service';
import { Location } from '../../interfaces/location';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [LocationComponent, FormsModule],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.scss'
})
export class UbicacionComponent {
  ListadoUbicaciones: Location[] = [];

  name = '';
  type = '';
  dimension = '';

  locationService: LocationService = inject(LocationService);

  constructor() {
    this.locationService.obtenerUbicaciones().subscribe((data: Location[]) => {
      this.ListadoUbicaciones = data || [];
    });
  }

  buscar() {
    const filtros: any = {};
    if (this.name) filtros.name = this.name;
    if (this.type) filtros.type = this.type;
    if (this.dimension) filtros.dimension = this.dimension;

    this.locationService.obtenerUbicacionesFiltradas(filtros)
      .subscribe(data => {
        this.ListadoUbicaciones = data || [];
      });
  }
}

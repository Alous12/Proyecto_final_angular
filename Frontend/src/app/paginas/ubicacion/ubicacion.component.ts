import { Component, inject } from '@angular/core';
import { LocationComponent } from '../../elementos/location/location.component';
import { LocationService } from '../../servicios/location.service';
import { Location } from '../../interfaces/location';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [LocationComponent, FormsModule,CommonModule],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.scss'
})
export class UbicacionComponent {
  ListadoUbicaciones: Location[] = [];

  name = '';
  type = '';
  dimension = '';

  locationService: LocationService = inject(LocationService);

  constructor(private router: Router) {
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

  irAgregarUbicacion() {
    this.router.navigate(['/agregar-ubicacion']);
  }
}

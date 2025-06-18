import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../servicios/location.service';
import { Router } from '@angular/router';
import { Location } from '../../interfaces/location';

@Component({
  selector: 'app-agregar-ubicacion',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './agregar-ubicacion.component.html',
  styleUrl: './agregar-ubicacion.component.scss'
})
export class AgregarUbicacionComponent {
  ubicacion: Partial<Location> = {
    name: '',
    type: '',
    dimension: '',
    url: '',
    created: new Date()
  };
  isLoading = false;
  errorMessage = '';

  constructor(private locationService: LocationService, private router: Router) {}

  agregarUbicacion() {
    this.isLoading = true;
    this.locationService.crearUbicacion(this.ubicacion as Location).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/ubicacion']);
      },
      error: () => {
        this.errorMessage = 'Error al agregar ubicación';
        this.isLoading = false;
      }
    });
  }
}

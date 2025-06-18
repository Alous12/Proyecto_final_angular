import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '../../interfaces/location';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../servicios/location.service';

@Component({
  selector: 'app-editar-ubicacion',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './editar-ubicacion.component.html',
  styleUrl: './editar-ubicacion.component.scss'
})
export class EditarUbicacionComponent {
  ubicacion: Location | undefined;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {
    this.id = Number(this.route.snapshot.params['id']);
    this.cargarUbicacion();
  }
  cargarUbicacion() {
    this.locationService.obtenerUbicacionPorId(this.id).subscribe({
      next: (data) => this.ubicacion = data,
      error: () => alert('No se pudo cargar la ubicación')
    });
  }

  guardar() {
    if (!this.ubicacion) return;
    this.locationService.actualizarUbicacion(this.id, this.ubicacion).subscribe({
      next: () => this.router.navigate(['/ubicacion']),
      error: () => alert('Error al actualizar ubicación')
    });
  }

  eliminar() {
    if (!confirm('¿Seguro que deseas eliminar esta ubicación?')) return;
    this.locationService.eliminarUbicacion(this.id).subscribe({
      next: () => this.router.navigate(['/ubicacion']),
      error: () => alert('Error al eliminar ubicación')
    });
  }

}

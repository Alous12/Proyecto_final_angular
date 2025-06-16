import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../servicios/location.service';
import { resultUbi } from '../../interfaces/location';
import { results } from '../../interfaces/character';
import { CharacterComponent } from '../../elementos/character/character.component';

@Component({
  selector: 'app-detalles-ubicacion',
  imports: [CharacterComponent],
  templateUrl: './detalles-ubicacion.component.html',
  styleUrl: './detalles-ubicacion.component.scss'
})
export class DetallesUbicacionComponent implements OnInit {
  ubicacion: resultUbi | undefined;
  personajes: results[] = [];
  cargando = true;

  constructor(private route: ActivatedRoute, private locationService: LocationService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.locationService.obtenerUbicacionesFiltradas({ id }).subscribe({
        next: (data) => {
          this.ubicacion = data.results[0];
          if (this.ubicacion && this.ubicacion.residents.length > 0) {
            this.locationService.obtenerPersonajesDeUbicacion(this.ubicacion.residents).subscribe({
              next: (personajes) => {
                this.personajes = personajes;
                this.cargando = false;
              },
              error: () => this.cargando = false
            });
          } else {
            this.cargando = false;
          }
        },
        error: () => this.cargando = false
      });
    } else {
      this.cargando = false;
    }
  }
}

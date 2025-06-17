import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../interfaces/location';
import { LocationService } from '../../servicios/location.service';
import { Character } from '../../interfaces/character';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-location',
  imports: [RouterLink],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements OnInit {
  @Input() ubicacion: Location | undefined;
  personajes: Character[] = [];
  cargando: boolean = false;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    if (this.ubicacion && this.ubicacion.residents && this.ubicacion.residents.length > 0) {
      this.cargando = true;
      this.locationService.obtenerPersonajesDeUbicacion(this.ubicacion.residents).subscribe({
        next: (personajes) => {
          this.personajes = personajes;
          this.cargando = false;
        },
        error: () => {
          this.cargando = false;
        }
      });
    }
  }
}

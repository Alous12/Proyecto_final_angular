import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../servicios/location.service';
import { Location } from '../../interfaces/location';
import { Character } from '../../interfaces/character';
import { CharacterComponent } from '../../elementos/character/character.component';

@Component({
  selector: 'app-detalles-ubicacion',
  imports: [CharacterComponent],
  templateUrl: './detalles-ubicacion.component.html',
  styleUrl: './detalles-ubicacion.component.scss'
})
export class DetallesUbicacionComponent implements OnInit {
  ubicacion: Location | undefined;
  personajes: Character[] = [];
  cargando = true;

  constructor(private route: ActivatedRoute, private locationService: LocationService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.locationService.obtenerUbicacionPorId(Number(id)).subscribe({
        next: (data) => {
          this.ubicacion = data;
          if (this.ubicacion?.presentCharacters?.length > 0) {
            this.personajes = this.ubicacion.presentCharacters;
          }
          this.cargando = false;
        },
        error: () => this.cargando = false
      });
    } else {
      this.cargando = false;
    }
  }
}

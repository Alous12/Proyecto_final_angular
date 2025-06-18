import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../interfaces/location';
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

  ngOnInit() {
    // Los personajes ya están en presentCharacters
    if (this.ubicacion && this.ubicacion.presentCharacters && this.ubicacion.presentCharacters.length > 0) {
         this.personajes = this.ubicacion.presentCharacters;
    }

  }
}

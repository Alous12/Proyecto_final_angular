import { Component, inject, Input} from '@angular/core';
import { Character } from '../../interfaces/character';
import { CharacterService } from '../../servicios/character.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character',
  imports: [RouterLink],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {
  @Input() personajes: Character | undefined;
  @Input() mostrarEpisodios: boolean = false;

  private characterService = inject(CharacterService);

  // Método para obtener los episodios de un personaje
  obtenerEpisodiosPorPersonaje(id: number) {
    return this.characterService.obtenerMultiplesEpisodiosPorId([id]);
}
  }
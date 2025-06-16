import { Component, inject, Input} from '@angular/core';
import { Character, results } from '../../interfaces/character';
import { CharacterService } from '../../servicios/character.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character',
  imports: [RouterLink],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {
  @Input() personajes: results | undefined;
}

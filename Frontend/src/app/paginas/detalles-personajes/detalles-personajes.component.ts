import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../servicios/character.service';
import { Character } from '../../interfaces/character';
import { CommonModule } from '@angular/common';
import { Episode } from '../../interfaces/episode';

@Component({
  selector: 'app-detalles-personajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles-personajes.component.html',
  styleUrl: './detalles-personajes.component.scss'
})
export class DetallesPersonajesComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  personajeService: CharacterService = inject(CharacterService);
  detallesPersonaje: Character | undefined;
  episodios: any[] = [];

  constructor() {
    const idpPersonaje = Number(this.route.snapshot.params['id']);
    
    this.personajeService.obtenerPersonajePorId(idpPersonaje).subscribe((personaje) => {
      this.detallesPersonaje = personaje;
    });

    this.personajeService.obtenerMultiplesEpisodiosPorId(this.detallesPersonaje?.episodes.map((episode: Episode) => episode.id) || []).subscribe((episodios) => {
      this.episodios = episodios;
      console.log(this.episodios);
    });

  }
}

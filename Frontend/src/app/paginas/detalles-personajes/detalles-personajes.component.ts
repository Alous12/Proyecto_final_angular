import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CharacterService } from '../../servicios/character.service';
import { Character, results } from '../../interfaces/character';
import { CommonModule } from '@angular/common';

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
  detallesPersonaje: results | undefined;
  episodios: any[] = [];

  constructor() {
    const idpPersonaje = Number(this.route.snapshot.params['id']);
      this.personajeService.obtenerPersonajePorId(idpPersonaje).subscribe((personaje) => {
      this.detallesPersonaje = personaje;
      console.log(this.detallesPersonaje);

       const episodiosIds = personaje.episode.map((url: string) => Number(url.split('/').pop()));

    
    this.personajeService.obtenerMultiplesEpisodiosPorId(episodiosIds).subscribe((episodiosData) => {
      this.episodios = Array.isArray(episodiosData) ? episodiosData : [episodiosData];
    });

    });


    


  }

}

import { Component, inject } from '@angular/core';
import { EpisodeComponent } from '../../elementos/episode/episode.component';
import { EpisodeService } from '../../servicios/episode.service';
import { Episode } from '../../interfaces/episode';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-episodios',
  imports: [EpisodeComponent, FormsModule],
  templateUrl: './episodios.component.html',
  styleUrl: './episodios.component.scss'
})
export class EpisodiosComponent {
  ListadoEpisodios: Episode[] = [];
  name = '';
  episode= '';
  episodeService: EpisodeService=inject(EpisodeService);
  constructor() {
    this.episodeService.obtenerEpisodios().subscribe(data => this.ListadoEpisodios = data);
  }
buscar() {
  const filtros: any = {};
  if (this.name) filtros.name = this.name;
  if (this.episode) filtros.episode = this.episode;

  this.episodeService.obtenerEpisodiosFiltrados(filtros)
    .subscribe(data => this.ListadoEpisodios = data);
}
}


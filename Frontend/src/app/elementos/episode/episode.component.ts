import { Component, Input } from '@angular/core';
import { resultsEpi } from '../../interfaces/episode';

@Component({
  selector: 'app-episode',
  imports: [],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.scss'
})
export class EpisodeComponent {
  @Input() episodios: resultsEpi| undefined;

}

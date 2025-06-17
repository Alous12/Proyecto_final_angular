import { Component, Input } from '@angular/core';
import { Episode } from '../../interfaces/episode';

@Component({
  selector: 'app-episode',
  imports: [],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.scss'
})
export class EpisodeComponent {
  @Input() episodios: Episode| undefined;

}

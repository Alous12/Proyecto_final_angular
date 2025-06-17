import { Controller, Get } from '@nestjs/common';
import { Episode } from './episode.entity';
import { EpisodesService } from './episodes.service';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  findAll(): Promise<Episode[]> {
    return this.episodesService.findAll();
  }
}

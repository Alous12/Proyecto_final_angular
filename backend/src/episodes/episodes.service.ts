import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './episode.entity';

@Injectable()
export class EpisodesService {
    constructor(
    @InjectRepository(Episode)
    private readonly episodeRepo: Repository<Episode>,
  ) {}

  findAll(): Promise<Episode[]> {
    return this.episodeRepo.find();
  }
}

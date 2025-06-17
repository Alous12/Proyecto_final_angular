import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number): Promise<Episode | null> {
    return this.episodeRepo.findOneBy({ id });
  }

    create(episode: Partial<Episode>): Promise<Episode> {
        const newEpisode = this.episodeRepo.create(episode);
        return this.episodeRepo.save(newEpisode);
    }

    async update(id: number, data: Partial<Episode>): Promise<Episode> {
        const entity = await this.episodeRepo.preload({ id, ...data });
        if (!entity) {
            throw new NotFoundException(`Episode ${id} not found`);
        }
        return this.episodeRepo.save(entity);
    }

    async remove(id: number): Promise<void> {
        const result = await this.episodeRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Episode ${id} not found`);
        }
    }
}

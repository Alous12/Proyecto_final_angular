import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Episode } from './episode.entity';
import { Character } from 'src/characters/character.entity';

@Injectable()
export class EpisodesService {
    constructor(
  @InjectRepository(Episode)
  private readonly episodeRepo: Repository<Episode>,

  @InjectRepository(Character)
  private readonly characterRepo: Repository<Character>,
) {}

  findAll(): Promise<Episode[]> {
    return this.episodeRepo.find();
  }

  findOne(id: number): Promise<Episode | null> {
    return this.episodeRepo.findOneBy({ id });
  }

    async create(data: Partial<Episode>): Promise<Episode> {
    const characters = Array.isArray(data.characters)
      ? await this.characterRepo.findBy({ id: In(data.characters.map(Number)) })
      : [];

    const episode = this.episodeRepo.create({
    ...data,
    characters,
    });

    return this.episodeRepo.save(episode);
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

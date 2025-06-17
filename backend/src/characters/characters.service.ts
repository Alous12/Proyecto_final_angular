import { Injectable, NotFoundException } from '@nestjs/common';
import { Character } from './character.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../locations/location.entity';
import { Episode } from '../episodes/episode.entity';
import { In } from 'typeorm';


@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>,

    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,

    @InjectRepository(Episode)
    private readonly episodeRepo: Repository<Episode>,
  ) {}

  findAll(): Promise<Character[]> {
    return this.characterRepo.find();
  }

  findOne(id: number): Promise<Character | null> {
    return this.characterRepo.findOneBy({ id });
  }
  
  findManyByIds(ids: number[]): Promise<Character[]> {
      return this.characterRepo.find({
      where: ids.map((id) => ({ id })),
    });
  } 


  filterCharacters(query: any): Promise<Character[]> {
    const qb = this.characterRepo.createQueryBuilder('character');

    if (query.name) {
      qb.andWhere('character.name LIKE :name', { name: `%${query.name}%` });
    }
    if (query.status) {
      qb.andWhere('character.status = :status', { status: query.status });
    }
    if (query.species) {
      qb.andWhere('character.species = :species', { species: query.species });
    }
    if (query.type) {
      qb.andWhere('character.type = :type', { type: query.type });
    }
    if (query.gender) {
      qb.andWhere('character.gender = :gender', { gender: query.gender });
    }

    return qb.getMany();
  }



  async create(data: Partial<Character>): Promise<Character> {
  const origin = data.origin
    ? await this.locationRepo.findOne({ where: { id: Number(data.origin) } })
    : null;

  const location = data.location
    ? await this.locationRepo.findOne({ where: { id: Number(data.location) } })
    : null;

  const episodes = Array.isArray(data.episodes)
    ? await this.episodeRepo.findBy({ id: In(data.episodes.map(Number)) })
    : [];

  // Extraemos los campos conflictivos
  const { origin: _, location: __, episodes: ___, ...rest } = data;

  // Forzamos el tipo para que TypeORM esté contento
  const characterData: DeepPartial<Character> = {
    ...rest,
    origin: origin ?? undefined,
    location: location ?? undefined,
    episodes,
  };

  const character = this.characterRepo.create(characterData);
  return this.characterRepo.save(character);
}





  async update(id: number, data: Partial<Character>): Promise<Character> {
  const entity = await this.characterRepo.preload({ id, ...data });
    if (!entity) {
     throw new NotFoundException(`Character ${id} not found`);
    }
        return this.characterRepo.save(entity);
    }


  async remove(id: number): Promise<void> {
    const result = await this.characterRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Character ${id} not found`);
    }
  }
}

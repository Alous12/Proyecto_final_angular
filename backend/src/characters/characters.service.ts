import { Injectable, NotFoundException } from '@nestjs/common';
import { Character } from './character.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>,
  ) {}

  findAll(): Promise<Character[]> {
    return this.characterRepo.find();
  }

  findOne(id: number): Promise<Character | null> {
    return this.characterRepo.findOneBy({ id });
  }

  create(character: Partial<Character>): Promise<Character> {
    const newCharacter = this.characterRepo.create(character);
    return this.characterRepo.save(newCharacter);
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

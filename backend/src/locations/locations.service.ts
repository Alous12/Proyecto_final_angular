import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationsService {
constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {}

  findAll(): Promise<Location[]> {
    return this.locationRepo.find();
  }  

  findOne(id: number): Promise<Location | null> {
    return this.locationRepo.findOneBy({ id });
  }
  create(location: Partial<Location>): Promise<Location> {
    const newLocation = this.locationRepo.create(location);
    return this.locationRepo.save(newLocation);
  }
  async update(id: number, data: Partial<Location>): Promise<Location> {
    const entity = await this.locationRepo.preload({ id, ...data });
    if (!entity) {
      throw new NotFoundException(`Location ${id} not found`);
    }
    return this.locationRepo.save(entity);
  }
  async remove(id: number): Promise<void> {
    const result = await this.locationRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Location ${id} not found`);
    }
  }
}

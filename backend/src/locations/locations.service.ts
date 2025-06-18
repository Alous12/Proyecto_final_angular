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
    return this.locationRepo.find({
    relations: ['presentCharacters'],
    });
  }

findOne(id: number): Promise<Location | null> {
  return this.locationRepo.findOne({
    where: { id },
    relations: ['presentCharacters'],
  });
}


  findManyByIds(ids: number[]): Promise<Location[]> {
    return this.locationRepo.find({
      where: ids.map((id) => ({ id })),
    });
  }

  filterLocations(query: any): Promise<Location[]> {
    const qb = this.locationRepo.createQueryBuilder('location');
    if (query.name) {
      qb.andWhere('location.name LIKE :name', { name: `%${query.name}%` });
    }
    if (query.type) {
      qb.andWhere('location.type = :type', { type: query.type });
    }
    if (query.dimension) {
      qb.andWhere('location.dimension = :dimension', { dimension: query.dimension });
    }
    return qb.getMany();
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

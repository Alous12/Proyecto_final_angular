import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { Location } from '../locations/location.entity';
import { Episode } from '../episodes/episode.entity';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Location, Episode])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { Episode } from './episode.entity';
import { Character } from '../characters/character.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Character])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}

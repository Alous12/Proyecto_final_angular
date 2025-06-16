import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [EpisodesModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

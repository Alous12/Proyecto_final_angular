import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { LocationsModule } from './locations/locations.module';
import { CharactersModule } from './characters/characters.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [CharactersModule, SupabaseModule,EpisodesModule, LocationsModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

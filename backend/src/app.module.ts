import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [EpisodesModule, LocationsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql5.freesqldatabase.com',
      port: 3306,
      username: 'sql5785187',
      password: '1adKZ8GRXC',
      database: 'sql5785187',
      autoLoadEntities: true,
      synchronize: true, // Desactiva en producción
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

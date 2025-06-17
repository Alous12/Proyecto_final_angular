import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Episode } from './episode.entity';
import { EpisodesService } from './episodes.service';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  findAll(): Promise<Episode[]> {
    return this.episodesService.findAll();
  }

  @Get('multiple')
  getMultiple(@Query('ids') ids: string): Promise<Episode[]> {  
    const parsedIds = ids.split(',').map((id) => Number(id.trim()));
    return this.episodesService.findManyByIds(parsedIds);
  }
  @Get('filter')
  filterEpisodes(@Query() query: any): Promise<Episode[]> {
    return this.episodesService.filterEpisodes(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Episode | null> {
    return this.episodesService.findOne(id);
  }

  @Post()
  create(@Body() episode: Partial<Episode>): Promise<Episode> { 
    return this.episodesService.create(episode);
  } 

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Episode>): Promise<Episode> {
    return this.episodesService.update(Number(id), data);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() data: Partial<Episode>): Promise<Episode> { 
    return this.episodesService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.episodesService.remove(id);
  }


}

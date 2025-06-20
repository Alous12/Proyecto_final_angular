import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './location.entity';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    @Get()
    findAll(): Promise<Location[]> {
        return this.locationsService.findAll();
    }

    @Get('multiple')
    getMultiple(@Query('ids') ids: string): Promise<Location[]> {
        const parsedIds = ids.split(',').map((id) => Number(id.trim()));
        return this.locationsService.findManyByIds(parsedIds);
    }

    @Get('filter')
    filterLocations(@Query() query: any): Promise<Location[]> {
        return this.locationsService.filterLocations(query);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Location | null> {
        return this.locationsService.findOne(id);
    }

    @Post()
    create(@Body() location: Partial<Location>): Promise<Location> {
    return this.locationsService.create(location);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<Location>): Promise<Location> {
        return this.locationsService.update(Number(id), data);
    }

    @Patch(':id')
    partialUpdate(@Param('id') id: string, @Body() data: Partial<Location>): Promise<Location> {
        return this.locationsService.update(Number(id), data);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.locationsService.remove(id);
    }
}

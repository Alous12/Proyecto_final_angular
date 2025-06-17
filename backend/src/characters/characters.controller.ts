import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character } from './character.entity';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  findAll(): Promise<Character[]> {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Character | null> {
    return this.charactersService.findOne(id);
  }

  @Post()
  create(@Body() character: Partial<Character>): Promise<Character> {
    return this.charactersService.create(character);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Character>): Promise<Character> {
    return this.charactersService.update(Number(id), data);
  }

  @Patch(':id')
   partialUpdate(@Param('id') id: string, @Body() data: Partial<Character>): Promise<Character> {
   return this.charactersService.update(Number(id), data);
  }


  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.charactersService.remove(id);
  }
}

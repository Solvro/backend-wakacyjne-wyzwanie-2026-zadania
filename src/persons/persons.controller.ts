import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, UseGuards } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('persons')
export class PersonsController {
  constructor(@Inject(PersonsService) private personsService: PersonsService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LocalAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @UseGuards(LocalAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.personsService.remove(+id);
  }
}

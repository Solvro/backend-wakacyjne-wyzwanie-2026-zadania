import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import {ApiOperation, ApiTags, ApiResponse} from '@nestjs/swagger';

@Controller('participant')
@ApiTags('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({
    summary: 'Stworzenie nowego uczestnika',
    description: 'Dodaje nowego uczestnika do bazy danych.'
  })
  @ApiResponse({
    status: 201,
    description: 'Uczestnik został stworzony pomyślnie.'
  })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Pobranie wszystkich uczestników',
    description: 'Zwraca listę wszystkich uczestników z bazy danych.'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista uczestników została pobrana pomyślnie.'
  })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Pobranie konkretnego uczestnika',
    description: 'Zwraca informacje o konkretnym uczestniku na podstawie jego ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Informacje o uczestniku zostały pobrane pomyślnie.'
  })
  findOne(@Param('id') id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Aktualizacja konkretnego uczestnika',
    description: 'Aktualizuje informacje o konkretnym uczestniku na podstawie jego ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Uczestnik został zaktualizowany pomyślnie.'
  })
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Usunięcie konkretnego uczestnika',
    description: 'Usuwa konkretnego uczestnika z bazy danych na podstawie jego ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Uczestnik został usunięty pomyślnie.'
  })
  remove(@Param('id') id: string) {
    return this.participantService.remove(+id);
  }
}

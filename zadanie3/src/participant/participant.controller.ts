import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@ApiTags('Uczestnicy')
@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({ summary: 'Dodaje nowego uczestnika do wyjazdu' })
  @ApiResponse({ status: 201, description: 'Uczestnik został pomyślnie dodany.' })
  @ApiResponse({ status: 400, description: 'Nieprawidłowe dane wejściowe.' })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobiera listę wszystkich uczestników' })
  @ApiResponse({ status: 200, description: 'Lista uczestników została pobrana.' })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobiera dane uczestnika o podanym ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Identyfikator uczestnika' })
  @ApiResponse({ status: 200, description: 'Uczestnik został znaleziony.' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono uczestnika o podanym ID.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aktualizuje dane uczestnika (np. zmianę roli lub nazwiska)' })
  @ApiParam({ name: 'id', example: 1, description: 'Identyfikator uczestnika' })
  @ApiResponse({ status: 200, description: 'Uczestnik został pomyślnie zaktualizowany.' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono uczestnika.' })
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateParticipantDto: UpdateParticipantDto
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuwa uczestnika z wyjazdu' })
  @ApiParam({ name: 'id', example: 1, description: 'Identyfikator uczestnika' })
  @ApiResponse({ status: 200, description: 'Uczestnik został pomyślnie usunięty.' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono uczestnika.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}
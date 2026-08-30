import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('participant')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({ summary: 'Tworzenie nowego uczestnika' })
  @ApiResponse({ status: 201, description: 'Uczestnik został pomyślnie utworzony.' })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobieranie wszystkich uczestników' })
  @ApiResponse({ status: 200, description: 'Lista uczestników zwrócona pomyślnie.' })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobieranie uczestnika po ID' })
  @ApiResponse({ status: 200, description: 'Uczestnik został pomyślnie znaleziony.' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono uczestnika.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aktualizacja danych uczestnika' })
  @ApiResponse({ status: 200, description: 'Uczestnik został zaktualizowany.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuwanie uczestnika' })
  @ApiResponse({ status: 200, description: 'Uczestnik został usunięty.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}
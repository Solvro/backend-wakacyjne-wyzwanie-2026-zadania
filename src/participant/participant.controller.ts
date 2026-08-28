import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Uczestnicy (Participants)')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({ summary: 'Dodaj uczestnika' })
  create(@Body() createParticipantDto: CreateParticipantDto) { return this.participantService.create(createParticipantDto); }

  @Get()
  @ApiOperation({ summary: 'Pobierz wszystkich' })
  findAll() { return this.participantService.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz po ID' })
  findOne(@Param('id') id: string) { return this.participantService.findOne(+id); }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj uczestnika' })
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) { return this.participantService.update(+id, updateParticipantDto); }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń uczestnika' })
  remove(@Param('id') id: string) { return this.participantService.remove(+id); }
}
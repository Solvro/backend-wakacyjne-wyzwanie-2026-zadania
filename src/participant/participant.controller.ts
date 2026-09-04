import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Uczestnicy (Participants)')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Dodaj uczestnika' })
  create(@Body() createParticipantDto: CreateParticipantDto) { return this.participantService.create(createParticipantDto); }

  @Get()
  @ApiOperation({ summary: 'Pobierz wszystkich' })
  findAll() { return this.participantService.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz po ID' })
  findOne(@Param('id') id: string) { return this.participantService.findOne(+id); }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj uczestnika' })
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) { return this.participantService.update(+id, updateParticipantDto); }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Usuń uczestnika' })
  remove(@Param('id') id: string) { return this.participantService.remove(+id); }
}
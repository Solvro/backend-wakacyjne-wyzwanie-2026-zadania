import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantResponseDto } from './dto/participant-response.dto';

@ApiTags('participant')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({
    summary: 'Dodaj nowego uczestnika',
    description: 'Rejestruje nowego uczestnika przypisanego do danej wycieczki.',
  })
  @ApiResponse({
    status: 201,
    description: 'Uczestnik został pomyślnie utworzony.',
    type: ParticipantResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Niepoprawne dane wejściowe (błąd walidacji).',
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Pobierz listę uczestników',
    description: 'Zwraca listę wszystkich uczestników wraz z danymi wycieczki.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista uczestników pobrana pomyślnie.',
    type: [ParticipantResponseDto],
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Pobierz uczestnika po ID',
    description: 'Zwraca szczegóły uczestnika o podanym ParticipantID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identyfikator uczestnika (ParticipantID)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Uczestnik znaleziony.',
    type: ParticipantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Uczestnik o podanym ID nie został znaleziony.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Zaktualizuj uczestnika po ID',
    description: 'Aktualizuje dane uczestnika o podanym ParticipantID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identyfikator uczestnika (ParticipantID)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Dane uczestnika zostały pomyślnie zaktualizowane.',
    type: ParticipantResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Niepoprawne dane aktualizacji (błąd walidacji).',
  })
  @ApiResponse({
    status: 404,
    description: 'Uczestnik o podanym ID nie został znaleziony.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Usuń uczestnika po ID',
    description: 'Usuwa uczestnika o podanym ParticipantID z bazy danych.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identyfikator uczestnika (ParticipantID)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Uczestnik został pomyślnie usunięty.',
    type: ParticipantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Uczestnik o podanym ID nie został znaleziony.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

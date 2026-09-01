import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Participants')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({
    summary: 'Utwórz nowego uczestnika',
    description: 'Dodaje nowego uczestnika wycieczki do bazy danych.',
  })
  @ApiResponse({
    status: 201,
    description: 'Uczestnik został pomyślnie utworzony.',
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę uczestników' })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Liczba pomijanych rekordów (od którego zacząć)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Maksymalna liczba zwracanych rekordów',
  })
  @ApiResponse({
    status: 200,
    description: 'Zwraca listę wszystkich uczestników.',
  })
  async findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.participantService.findAll(offset, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz uczestnika po ID' })
  @ApiResponse({
    status: 200,
    description: 'Zwraca szczegóły konkretnego uczestnika.',
  })
  @ApiResponse({ status: 404, description: 'Uczestnik nie został znaleziony.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj dane uczestnika' })
  @ApiResponse({
    status: 200,
    description: 'Dane uczestnika zostały pomyślnie zaktualizowane.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń uczestnika' })
  @ApiResponse({
    status: 200,
    description: 'Uczestnik został pomyślnie usunięty.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

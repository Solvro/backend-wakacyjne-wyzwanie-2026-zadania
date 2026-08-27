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
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Participant')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({ summary: 'Dodaj nowego uczestnika' })
  @ApiResponse({
    status: 201,
    description: 'Uczestnik został pomyślnie utworzony.',
  })
  @ApiResponse({ status: 400, description: 'Niepoprawne dane wejściowe.' })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wszystkich uczestników' })
  @ApiResponse({
    status: 200,
    description: 'Zwraca listę wszystkich uczestników.',
  })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz uczestnika po ID' })
  @ApiParam({ name: 'id', description: 'Identyfikator uczestnika', example: 1 })
  @ApiResponse({ status: 200, description: 'Zwraca dane uczestnika.' })
  @ApiResponse({
    status: 404,
    description: 'Uczestnik o podanym ID nie istnieje.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj dane uczestnika' })
  @ApiParam({ name: 'id', description: 'Identyfikator uczestnika', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Uczestnik został pomyślnie zaktualizowany.',
  })
  @ApiResponse({
    status: 404,
    description: 'Uczestnik o podanym ID nie istnieje.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń uczestnika' })
  @ApiParam({ name: 'id', description: 'Identyfikator uczestnika', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Uczestnik został pomyślnie usunięty.',
  })
  @ApiResponse({
    status: 404,
    description: 'Uczestnik o podanym ID nie istnieje.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantResponseDto } from './dto/participant-response.dto';

@ApiTags('participants')
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @ApiOperation({ summary: 'Dodaj nowego uczestnika' })
  @ApiResponse({
    status: 201,
    description: 'Uczestnik został pomyślnie utworzony.',
    type: ParticipantResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Niepoprawne dane wejściowe.' })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wszystkich uczestników' })
  @ApiResponse({
    status: 200,
    description: 'Lista uczestników.',
    type: [ParticipantResponseDto],
  })
  findAll() {
    return this.participantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz uczestnika po ID' })
  @ApiParam({ name: 'id', description: 'Identyfikator uczestnika', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Dane uczestnika.',
    type: ParticipantResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Uczestnik nie został znaleziony.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj dane uczestnika' })
  @ApiParam({ name: 'id', description: 'Identyfikator uczestnika', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Zaktualizowane dane uczestnika.',
    type: ParticipantResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Uczestnik nie został znaleziony.' })
  @ApiResponse({ status: 400, description: 'Niepoprawne dane wejściowe.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantsService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Usuń uczestnika' })
  @ApiParam({ name: 'id', description: 'Identyfikator uczestnika', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Uczestnik został usunięty.',
    type: ParticipantResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Uczestnik nie został znaleziony.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.remove(id);
  }
}

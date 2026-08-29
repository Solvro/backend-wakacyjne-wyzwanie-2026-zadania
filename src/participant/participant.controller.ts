import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantResponseDto } from './dto/participant-response.dto';

@ApiTags('participants')
@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz listę uczestników' })
  @ApiQuery({
    name: 'tripId',
    required: false,
    type: Number,
    description: 'Opcjonalne filtrowanie po ID wycieczki',
  })
  @ApiOkResponse({
    description: 'Lista uczestników',
    type: [ParticipantResponseDto],
  })
  findAll(@Query('tripId') tripId?: string) {
    const parsedTripId = tripId ? parseInt(tripId, 10) : undefined;
    return this.participantService.findAll(parsedTripId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz szczegóły uczestnika po ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID uczestnika' })
  @ApiOkResponse({
    description: 'Szczegóły uczestnika',
    type: ParticipantResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Uczestnik o podanym ID nie istnieje' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Dodaj nowego uczestnika' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Uczestnik został pomyślnie utworzony',
    type: ParticipantResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Błąd walidacji danych wejściowych',
  })
  @ApiNotFoundResponse({
    description: 'Wycieczka o podanym tripId nie istnieje',
  })
  create(@Body() dto: CreateParticipantDto) {
    return this.participantService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj dane uczestnika' })
  @ApiParam({ name: 'id', type: Number, description: 'ID uczestnika' })
  @ApiOkResponse({
    description: 'Dane uczestnika zostały pomyślnie zaktualizowane',
    type: ParticipantResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Uczestnik o podanym ID lub wycieczka nie istnieje',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Błąd walidacji danych',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Usuń uczestnika' })
  @ApiParam({ name: 'id', type: Number, description: 'ID uczestnika' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Uczestnik został pomyślnie usunięty',
  })
  @ApiNotFoundResponse({ description: 'Uczestnik o podanym ID nie istnieje' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripResponseDto } from './dto/trip-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: 'Dodaj nową wycieczkę',
    description: 'Tworzy nową wycieczkę w bazie danych. Wymaga autoryzacji JWT.',
  })
  @ApiResponse({
    status: 201,
    description: 'Wycieczka została pomyślnie utworzona.',
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Niepoprawne dane wejściowe (błąd walidacji).',
  })
  @ApiResponse({
    status: 401,
    description: 'Brak autoryzacji (wymagany token JWT).',
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Pobierz listę wycieczek',
    description:
      'Zwraca listę wszystkich wycieczek wraz z powiązanymi uczestnikami i wydatkami (publiczne).',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista wycieczek pobrana pomyślnie.',
    type: [TripResponseDto],
  })
  async findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Pobierz wycieczkę po ID',
    description: 'Zwraca szczegóły pojedynczej wycieczki o podanym TripID (publiczne).',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identyfikator wycieczki (TripID)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Wycieczka znaleziona.',
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Wycieczka o podanym ID nie została znaleziona.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({
    summary: 'Zaktualizuj wycieczkę po ID',
    description: 'Aktualizuje wybrane pola wycieczki o podanym TripID. Wymaga autoryzacji JWT.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identyfikator wycieczki (TripID)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Wycieczka została pomyślnie zaktualizowana.',
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Niepoprawne dane aktualizacji (błąd walidacji).',
  })
  @ApiResponse({
    status: 401,
    description: 'Brak autoryzacji (wymagany token JWT).',
  })
  @ApiResponse({
    status: 404,
    description: 'Wycieczka o podanym ID nie została znaleziona.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripsService.update(id, updateTripDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Usuń wycieczkę po ID',
    description: 'Usuwa wycieczkę o podanym TripID z bazy danych. Wymaga autoryzacji JWT.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identyfikator wycieczki (TripID)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Wycieczka została pomyślnie usunięta.',
    type: TripResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Brak autoryzacji (wymagany token JWT).',
  })
  @ApiResponse({
    status: 404,
    description: 'Wycieczka o podanym ID nie została znaleziona.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.remove(id);
  }
}

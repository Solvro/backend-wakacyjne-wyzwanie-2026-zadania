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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Utwórz nową wycieczkę (wymaga logowania)' })
  @ApiResponse({
    status: 201,
    description: 'Wycieczka została pomyślnie utworzona.',
    type: TripResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Niepoprawne dane wejściowe.' })
  @ApiResponse({ status: 401, description: 'Brak autoryzacji (wymagany token JWT).' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wszystkich wycieczek' })
  @ApiResponse({
    status: 200,
    description: 'Lista wycieczek.',
    type: [TripResponseDto],
  })
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz wycieczkę po ID' })
  @ApiParam({ name: 'id', description: 'Identyfikator wycieczki', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Dane wycieczki.',
    type: TripResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Wycieczka nie została znaleziona.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj wycieczkę (wymaga logowania)' })
  @ApiParam({ name: 'id', description: 'Identyfikator wycieczki', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Zaktualizowane dane wycieczki.',
    type: TripResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Wycieczka nie została znaleziona.' })
  @ApiResponse({ status: 400, description: 'Niepoprawne dane wejściowe.' })
  @ApiResponse({ status: 401, description: 'Brak autoryzacji (wymagany token JWT).' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripsService.update(id, updateTripDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Usuń wycieczkę (wymaga logowania)' })
  @ApiParam({ name: 'id', description: 'Identyfikator wycieczki', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Wycieczka została usunięta.',
    type: TripResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Wycieczka nie została znaleziona.' })
  @ApiResponse({ status: 401, description: 'Brak autoryzacji (wymagany token JWT).' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.remove(id);
  }
}

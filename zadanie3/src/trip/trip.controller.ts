import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@ApiTags('Wyjazdy')
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({ summary: 'Tworzy nowy wyjazd' })
  @ApiResponse({ status: 201, description: 'Wyjazd został pomyślnie utworzony.' })
  @ApiResponse({ status: 400, description: 'Nieprawidłowe dane wejściowe.' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobiera listę wszystkich wyjazdów' })
  @ApiResponse({ status: 200, description: 'Lista wyjazdów została pobrana.' })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobiera szczegóły wyjazdu o podanym ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Identyfikator wyjazdu' })
  @ApiResponse({ status: 200, description: 'Wyjazd został znaleziony.' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono wyjazdu o podanym ID.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aktualizuje dane wyjazdu' })
  @ApiParam({ name: 'id', example: 1, description: 'Identyfikator wyjazdu' })
  @ApiResponse({ status: 200, description: 'Wyjazd został pomyślnie zaktualizowany.' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono wyjazdu.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuwa wyjazd' })
  @ApiParam({ name: 'id', example: 1, description: 'Identyfikator wyjazdu' })
  @ApiResponse({ status: 200, description: 'Wyjazd został pomyślnie usunięty.' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono wyjazdu.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}
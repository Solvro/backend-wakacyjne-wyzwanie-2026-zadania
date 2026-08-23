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
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  // GET /trips — lista wszystkich wycieczek
  @Get()
  findAll() {
    return this.tripService.findAll();
  }

  // GET /trips/:id — szczegóły wycieczki z uczestnikami i wydatkami
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  // POST /trips — tworzenie nowej wycieczki
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTripDto) {
    return this.tripService.create(dto);
  }

  // PATCH /trips/:id — częściowa aktualizacja wycieczki
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTripDto) {
    return this.tripService.update(id, dto);
  }

  // DELETE /trips/:id — usunięcie wycieczki (kaskadowo usuwa uczestników i wydatki)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

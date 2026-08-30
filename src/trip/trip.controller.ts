import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('trip')
@ApiTags('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({
    summary: 'Stworzenie nowej podróży',
    description: 'Dodaje nową podróż do bazy danych.'
  })
  @ApiResponse({
    status: 201,
    description: 'Podróż została stworzona pomyślnie.'
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Pobranie wszystkich podróży',
    description: 'Zwraca listę wszystkich podróży z bazy danych.'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista podróży została pobrana pomyślnie.'
  })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Pobranie konkretnej podróży',
    description: 'Zwraca informacje o konkretnej podróży na podstawie jej ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Podróż została pobrana pomyślnie.'
  })
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Aktualizacja konkretnej podróży',
    description: 'Aktualizuje informacje o konkretnej podróży na podstawie jej ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Podróż została zaktualizowana pomyślnie.'
  })
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Usunięcie konkretnej podróży',
    description: 'Usuwa konkretną podróż z bazy danych na podstawie jej ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Podróż została usunięta pomyślnie.'
  })
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }
}

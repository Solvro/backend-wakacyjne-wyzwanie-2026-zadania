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
  UseGuards,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Trips')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Utwórz nową wycieczkę',
    description: 'Dodaje nową wycieczkę do bazy danych.',
  })
  @ApiResponse({
    status: 201,
    description: 'Wycieczka została pomyślnie utworzona.',
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wycieczek' })
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
    description: 'Zwraca listę wszystkich wycieczek.',
  })
  async findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.tripService.findAll(offset, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz wycieczkę po ID' })
  @ApiResponse({
    status: 200,
    description: 'Zwraca szczegóły konkretnej wycieczki.',
  })
  @ApiResponse({
    status: 404,
    description: 'Wycieczka nie została znaleziona.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj wycieczkę' })
  @ApiResponse({
    status: 200,
    description: 'Wycieczka została pomyślnie zaktualizowana.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Usuń wycieczkę' })
  @ApiResponse({
    status: 200,
    description: 'Wycieczka została pomyślnie usunięta.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

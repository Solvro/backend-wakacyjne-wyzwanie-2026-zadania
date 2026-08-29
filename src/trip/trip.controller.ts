import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@ApiTags('trips')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({ summary: 'Utwórz nową wycieczkę' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz wszystkie wycieczki (z paginacją)' })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.tripService.findAll(
      skip ? Number(skip) : undefined,
      take ? Number(take) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz wycieczkę po id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj wycieczkę' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń wycieczkę' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

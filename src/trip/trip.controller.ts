import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({
    summary: "Tworzy nową wycieczkę",
    description: "Tworzy nową wycieczkę z lokalizacją, datą początku oraz datą końca"
  })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: "Pobiera wszystkie wycieczki"
  })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Pobiera konkretną wycieczkę",
    description: "Pobiera konkretną wycieczkę według jej id"
  })
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Modyfikuje wycieczkę"
  })
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Usuwa wycieczkę"
  })
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }
}

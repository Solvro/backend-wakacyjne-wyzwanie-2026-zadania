import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
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
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  @ApiOperation({
    summary: "Modyfikuje wycieczkę"
  })
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiOperation({
    summary: "Usuwa wycieczkę"
  })
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }
}

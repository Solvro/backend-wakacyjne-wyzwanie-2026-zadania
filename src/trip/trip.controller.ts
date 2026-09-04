import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Trips (Wycieczki)')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Dodaj nową wycieczkę' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wszystkich wycieczek' })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz wycieczkę po ID' })
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj wycieczkę' })
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Usuń wycieczkę' })
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }
}
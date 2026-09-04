import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('trips')
export class TripsController {
  constructor(@Inject(TripsService) private tripsService: TripsService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LocalAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(+id, updateTripDto);
  }

  @Delete(':id')
  @UseGuards(LocalAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.remove(+id);
  }
}

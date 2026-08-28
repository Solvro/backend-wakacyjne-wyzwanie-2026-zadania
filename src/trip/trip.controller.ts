import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import type { UpdateTripDto } from './dto/update-trip.dto';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

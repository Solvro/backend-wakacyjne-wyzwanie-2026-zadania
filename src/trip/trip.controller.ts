// src/trips/trips.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TripsService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiResponse({ status: 201, description: 'Trip created successfully.' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all trips with expenses and participants' })
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trip by ID' })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update trip details' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trip' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.remove(id);
  }
}
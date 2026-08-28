import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TripsService } from './trips/trips.service';
import { CreateTripDto } from './trips/dto/create-trip.dto';
import { UpdateTripDto } from './trips/dto/update-trip.dto';

@Controller('trips')
@ApiTags('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  @ApiOperation({ summary: 'List all trips' })
  @ApiResponse({ status: 200, description: 'Trips returned successfully.' })
  findAll() {
    return this.tripsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a trip' })
  @ApiResponse({ status: 201, description: 'Trip created successfully.' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a trip by ID' })
  @ApiResponse({ status: 200, description: 'Trip returned successfully.' })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a trip' })
  @ApiResponse({ status: 200, description: 'Trip updated successfully.' })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trip' })
  @ApiResponse({ status: 200, description: 'Trip deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.remove(id);
  }
}
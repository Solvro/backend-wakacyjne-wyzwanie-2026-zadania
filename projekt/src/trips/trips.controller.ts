import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new Trip' })
  @ApiResponse({ status: 201, description: 'Trip created successfully' })
  @ApiResponse({ status: 400, description: 'Error: invalid data' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of all trips' })
  @ApiResponse({ status: 200, description: 'List of trips' })
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Trip by ID ' })
  @ApiResponse({ status: 200, description: 'Trip found' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update trip information' })
  @ApiResponse({ status: 200, description: 'Trip successfully updated' })
  @ApiResponse({ status: 404, description: 'Error: Cant update trip' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Trip' })
  @ApiResponse({ status: 200, description: 'Trip successfully deleted' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.remove(id);
  }
}

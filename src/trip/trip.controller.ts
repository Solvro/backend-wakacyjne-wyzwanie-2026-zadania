import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('trips')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({ status: 201, description: 'The trip has been successfully created.' })
  @ApiOperation({ summary: 'Create a new trip' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all trips' })
  @ApiOperation({ summary: 'Get all trips' })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a trip by ID' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @ApiOperation({ summary: 'Get a trip by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the trip', type: Number })
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The trip has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @ApiOperation({ summary: 'Update a trip by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the trip', type: Number })
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The trip has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @ApiOperation({ summary: 'Delete a trip by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the trip', type: Number })
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }
}

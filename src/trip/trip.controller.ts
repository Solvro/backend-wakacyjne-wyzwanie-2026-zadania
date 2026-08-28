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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Trip } from './entities/trip.entity';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new trip',
    description:
      'Adds a trip to the database. The title must be globally unique, and endDate must be after startDate',
  })
  @ApiResponse({
    status: 201,
    description: 'The trip has been successfully created',
    type: Trip,
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all trips',
    description: 'Lists all trips in the database',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all trips',
    type: [Trip],
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a trip',
    description: 'Retrieves a single trip by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The trip with the given ID',
    type: Trip,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a trip',
    description:
      'Updates a trip by its ID. If the title is changed, it must remain globally unique. If either date is changed, the resulting endDate must be after startDate',
  })
  @ApiResponse({
    status: 200,
    description: 'The trip has been successfully updated',
    type: Trip,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a trip',
    description:
      'Removes a trip from the database by its ID. The trip must have no participants or expenses left',
  })
  @ApiResponse({
    status: 200,
    description: 'The trip has been successfully deleted',
    type: Trip,
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';

@Controller('trip')
@ApiTags('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new trip',
    description: 'Add a new trip to the database'
  })
  @ApiResponse({
    status: 201,
    description: 'The new trip was successfully added to the database',
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrive a list of all trips',
    description: 'Retrive a list of all trips from the database',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of all trips was successfully retrived from the database',
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrive a trip with chosen ID',
    description: 'Retrive a trip with chosen ID from the database',
  })
  @ApiResponse({
    status: 200,
    description: 'The trip with chosen ID was successfully retrived from the database',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update the trip with chosen ID',
    description: 'Update and save the changed information about the trip with chosen ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The changed information was successfully changed',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete the trip with chosen ID',
    description: 'Delete the trip with chosen ID from the database',
  })
  @ApiResponse({
    status: 204,
    description: 'The trip with chosen ID was successfully deleted from the database',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}


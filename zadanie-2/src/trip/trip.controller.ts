import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('trip')
@ApiTags('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({
      summary: 'Create a new trip',
      description: 'Create a new trip containing a destination, start date and end date (optional).'
    })
    @ApiResponse({
      status: 201,
      description: "Trip created succesfully."
    })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all trips',
    description: 'Retrieves a list of all trips from the database'
  })
  @ApiResponse({
    status: 200,
    description: 'List retrieved succesfully'
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one trip',
    description: 'Retrieves a trip with a given unique ID from the database'
  })
  @ApiResponse({
    status: 200,
    description: 'Trip retrieved succesfully'
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found"
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update trip by ID',
    description: "Update a trip's data by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Trip's data updated succesfully"
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found"
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete trip by ID',
    description: 'Deletes a trip with a given unique ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Trip deleted succesfully'
  })
  @ApiResponse({
    status: 404,
    description: "Trip not found"
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

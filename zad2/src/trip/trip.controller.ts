import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({
    summary: "Insert a new trip",
    description: "Insert a new entry of a trip into the database",
  })
  @ApiResponse({
    status: 201,
    description: "Trip inserted succesfully"
  })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieve all the trips from the database",
  })
  @ApiResponse({
    status: 200,
    description: "Trips received succesfully",
    type: [CreateTripDto],
  })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get trip on given id",
    description: "Retrieve the trip with a given id from the database",
  })
  @ApiResponse({
    status: 200,
    description: "Trip received succesfully",
    type: [CreateTripDto],
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Change values of a given trip",
    description: "Change the values of a trip with a given id in the database",
  })
  @ApiResponse({
    status: 200,
    description: "Trip updated succesfully",
    type: [UpdateTripDto],
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Remove trip on given id",
    description: "Remove the trip with a given id from the database",
  })
  @ApiResponse({
    status: 200,
    description: "Trip removed succesfully",
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

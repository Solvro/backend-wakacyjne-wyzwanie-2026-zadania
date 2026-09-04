import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomJwtGuard } from '../auth/custom-jwt.guard';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @UseGuards(CustomJwtGuard)
  @Post()
  @ApiOperation({summary: "Add a new trip"})
  @ApiResponse({status: 201, description: "The expense has been successfully created."})
  @ApiResponse({status: 400, description: "Bad request."})
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({summary: "Get all trips"})
  @ApiResponse({status: 200, description: "Return all trips."})
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: "Get a trip with given ID"})
  @ApiResponse({status: 200, description: "Return the trip."})
  @ApiResponse({status: 404, description: "Trip not found."})
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(+id);
  }

  @UseGuards(CustomJwtGuard)
  @Patch(':id')
  @ApiOperation({summary: "Update a trip with given ID"})
  @ApiResponse({status: 200, description: "The trip has been successfully updated."})
  @ApiResponse({status: 400, description: "Bad request."})
  @ApiResponse({status: 404, description: "Trip not found."})
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @UseGuards(CustomJwtGuard)
  @Delete(':id')
  @ApiOperation({summary: "Delete a trip with given ID"})
  @ApiResponse({status: 200, description: "The trip has been successfully deleted."})
  @ApiResponse({status: 404, description: "Trip not found."})
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }
}

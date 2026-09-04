import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TripResponseDto } from './dto/response-trip.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Trip')
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiResponse({ status: 201, description: 'The trip has been successfully created.', type: TripResponseDto })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all trips' })
  @ApiResponse({ status: 200, description: 'List of all trips', type: [TripResponseDto] })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a trip by ID' })
  @ApiResponse({ status: 200, description: 'The trip with the specified ID', type: TripResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a trip by ID' })
  @ApiResponse({ status: 200, description: 'The trip has been successfully updated.', type: TripResponseDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a trip by ID' })
  @ApiResponse({ status: 200, description: 'The trip has been successfully deleted.', type: TripResponseDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}
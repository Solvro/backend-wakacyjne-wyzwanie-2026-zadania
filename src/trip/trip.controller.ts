import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTripResponseDto } from './dto/create-trip-response.dto';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('trips')
@ApiTags("trips")
export class TripController {
  constructor(private readonly tripService: TripService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create new trip",
    description: "Create new trip with name, destination, starting and ending date with budget"
  })
  @ApiResponse({
    status: 201,
    description: "Trip created successfully",
    type: CreateTripResponseDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all trips",
    description: "Retrieve a list of all trips"
  })
  @ApiResponse({
    status: 200,
    description: "List retrieved successfully",
    type: [CreateTripResponseDto]
  })
  async findAll(@Query() query: PaginationDto) {
    return this.tripService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get trip by ID",
    description: "Retrive a trip by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Trip retrieved successfully",
    type: CreateTripResponseDto
  })
  @ApiResponse({
    status: 404,
    description: " Trip not found"
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Update trip by ID",
    description: "Update a trip by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Trip updated successfully",
    type: CreateTripResponseDto
  })
  @ApiResponse({
    status: 404,
    description: " Trip not found"
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Delete trip by ID",
    description: "Delete a trip by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Trip deleted successfully",
    type: CreateTripResponseDto
  })
  @ApiResponse({
    status: 404,
    description: " Trip not found"
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

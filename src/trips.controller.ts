import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser } from './auth/jwt.strategy';
import { TripsService } from './trips/trips.service';
import { CreateTripDto } from './trips/dto/create-trip.dto';
import { UpdateTripDto } from './trips/dto/update-trip.dto';

@Controller('trips')
@ApiTags('trips')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  @ApiOperation({ summary: 'List all trips' })
  @ApiResponse({ status: 200, description: 'Trips returned successfully.' })
  findAll(@Req() request: Request & { user: AuthenticatedUser }) {
    return this.tripsService.findAll(request.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a trip' })
  @ApiResponse({ status: 201, description: 'Trip created successfully.' })
  create(@Req() request: Request & { user: AuthenticatedUser }, @Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(request.user.id, createTripDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a trip by ID' })
  @ApiResponse({ status: 200, description: 'Trip returned successfully.' })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  findOne(@Req() request: Request & { user: AuthenticatedUser }, @Param('id', ParseIntPipe) id: number) {
    return this.tripsService.findOne(request.user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a trip' })
  @ApiResponse({ status: 200, description: 'Trip updated successfully.' })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  update(@Req() request: Request & { user: AuthenticatedUser }, @Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(request.user.id, id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trip' })
  @ApiResponse({ status: 200, description: 'Trip deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Trip not found.' })
  remove(@Req() request: Request & { user: AuthenticatedUser }, @Param('id', ParseIntPipe) id: number) {
    return this.tripsService.remove(request.user.id, id);
  }
}
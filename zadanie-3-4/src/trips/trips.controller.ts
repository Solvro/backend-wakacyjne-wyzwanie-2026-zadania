import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripService: TripsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiResponse({
    status: 201,
    description: 'The trip has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad request (validation error)' })
  async create(
    @Body() createTripDto: CreateTripDto,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    return await this.tripService.create(createTripDto, currentUser);
  }

  @Get()
  @ApiOperation({ summary: 'Get all trips' })
  @ApiResponse({ status: 200, description: 'Return all trips' })
  async findAll() {
    return await this.tripService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a trip by UUID' })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'UUID of the trip',
  })
  @ApiResponse({ status: 200, description: 'Return the trip' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return await this.tripService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update a trip by UUID' })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'UUID of the trip to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The trip has been successfully updated',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (only the owner can update)',
  })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateTripDto: UpdateTripDto,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    return await this.tripService.update(uuid, updateTripDto, currentUser);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a trip by UUID' })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'UUID of the trip to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'The trip has been successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (only the owner can delete)',
  })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    await this.tripService.remove(uuid, currentUser);
  }
}

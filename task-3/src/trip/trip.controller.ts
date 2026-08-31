import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('trip')
@ApiTags('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new trip',
  })
  @ApiResponse({
    status: 201,
    description: 'Trip created successfully',
  })
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all trips',
  })
  @ApiResponse({
    status: 200,
    description: 'List retrieved successfully',
  })
  async findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get trip by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Trip retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Trip not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update trip by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Trip updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Trip not found',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete trip by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Trip deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Trip not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }

  @Post(':id/participants/:participantId')
  @ApiOperation({ summary: 'Add a participant to a trip' })
  @ApiParam({ name: 'id', description: 'Trip ID', example: 1 })
  @ApiParam({
    name: 'participantId',
    description: 'Participant ID',
    example: 2,
  })
  @ApiResponse({ status: 201, description: 'Participant added successfully' })
  @ApiResponse({ status: 400, description: 'Trip is fully booked' })
  @ApiResponse({ status: 404, description: 'Trip or Participant not found' })
  @ApiResponse({
    status: 409,
    description: 'Participant is already on this trip',
  })
  async addParticipant(
    @Param('id', ParseIntPipe) id: number,
    @Param('participantId', ParseIntPipe) participantId: number,
  ) {
    return this.tripService.addParticipant(id, participantId);
  }

  @Delete(':id/participants/:participantId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a participant from a trip' })
  @ApiParam({ name: 'id', description: 'Trip ID', example: 1 })
  @ApiParam({
    name: 'participantId',
    description: 'Participant ID',
    example: 2,
  })
  @ApiResponse({ status: 204, description: 'Participant removed successfully' })
  async removeParticipant(
    @Param('id', ParseIntPipe) id: number,
    @Param('participantId', ParseIntPipe) participantId: number,
  ) {
    return this.tripService.removeParticipant(id, participantId);
  }
}

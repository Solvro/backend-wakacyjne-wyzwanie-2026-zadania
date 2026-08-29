import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';

@ApiTags('trip')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiCreatedResponse({
    description: 'The trip has been successfully created.',
    type: Trip,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all trips' })
  @ApiOkResponse({
    description: 'List of all trips.',
    type: [Trip],
  })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a trip by ID' })
  @ApiParam({ name: 'id', description: 'Trip ID', type: Number })
  @ApiOkResponse({
    description: 'The trip details.',
    type: Trip,
  })
  @ApiNotFoundResponse({ description: 'Trip not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a trip by ID' })
  @ApiParam({ name: 'id', description: 'Trip ID', type: Number })
  @ApiOkResponse({
    description: 'The trip has been successfully updated.',
    type: Trip,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiNotFoundResponse({ description: 'Trip not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trip by ID' })
  @ApiParam({ name: 'id', description: 'Trip ID', type: Number })
  @ApiOkResponse({
    description: 'The trip has been successfully deleted.',
    type: Trip,
  })
  @ApiNotFoundResponse({ description: 'Trip not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

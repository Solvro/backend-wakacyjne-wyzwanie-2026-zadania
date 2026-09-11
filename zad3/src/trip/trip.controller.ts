import { Controller, Get, Post, Body, Patch, Param, Delete , ValidationPipe, UsePipes, ParseIntPipe} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Trips')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiResponse({ status: 201, description: 'The trip has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid data (e.g., missing destination).' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all trips' })
  @ApiResponse({ status: 200, description: 'Returns an array of all trips.' })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single trip by its ID' })
  @ApiResponse({ status: 200, description: 'Returns the found trip.' })
  @ApiResponse({ status: 404, description: 'Trip with the given ID was not found.' })
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({whitelist: true}))
  @ApiOperation({ summary: 'Update an existing trip' })
  @ApiResponse({ status: 200, description: 'The trip has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid data provided.' })
  @ApiResponse({ status: 404, description: 'Trip with the given ID was not found.' })
  update(@Param('id',ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trip by its ID' })
  @ApiResponse({ status: 200, description: 'The trip has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Trip with the given ID was not found.' })
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

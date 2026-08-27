import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { TripResponseDto } from './dto/reponse-trip.dto';

@ApiTags('trips')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({summary:"Create a trip"})
  @ApiResponse({status:201, description:"Trip created sucessfully"})
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({summary:"Get all trips"})
  @ApiResponse({status:200, type: TripResponseDto})
  findAll(@Query('page') page:number, @Query('limit') limit:number) {
    return this.tripService.findAll(page,limit);
  }

  @Get(':id')
  @ApiOperation({summary:"Get trip by ID"})
  @ApiResponse({status:200, type: TripResponseDto})
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.tripService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary:"Update trip by ID"})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @Delete(':id')
  @ApiOperation({summary:"Delete trip by ID"})
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.tripService.remove(+id);
  }
}

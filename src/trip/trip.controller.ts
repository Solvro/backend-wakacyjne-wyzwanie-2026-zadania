import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { TripResponseDto } from './dto/reponse-trip.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('trips')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({summary:"Create a trip"})
  @ApiResponse({status:201, description:"Trip created sucessfully"})
  create(@Body() req:any, createTripDto: CreateTripDto) {
    return this.tripService.create(req.user.id, createTripDto);
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

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({summary:"Update trip by ID"})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(+id, updateTripDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({summary:"Delete trip by ID"})
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.tripService.remove(+id);
  }
}

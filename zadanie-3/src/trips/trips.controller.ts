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

@Controller('trips')
export class TripsController {
  constructor(private readonly tripService: TripsService) {}

  @Post()
  async create(
    @Body() createTripDto: CreateTripDto,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    return await this.tripService.create(createTripDto, currentUser);
  }

  @Get()
  async findAll() {
    return await this.tripService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return await this.tripService.findOne(uuid);
  }

  @Patch(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateTripDto: UpdateTripDto,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    return await this.tripService.update(uuid, updateTripDto, currentUser);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    await this.tripService.remove(uuid, currentUser);
  }
}

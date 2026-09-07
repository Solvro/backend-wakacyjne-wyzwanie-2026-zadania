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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('trip')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new trip (requires authentication)' })
  @ApiCreatedResponse({
    description: 'The trip has been successfully created.',
    type: Trip,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized / Token expired.' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all trips with pagination (public)' })
  @ApiOkResponse({
    description: 'Paginated list of trips.',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tripService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a trip by ID (public)' })
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a trip by ID (requires authentication)' })
  @ApiParam({ name: 'id', description: 'Trip ID', type: Number })
  @ApiOkResponse({
    description: 'The trip has been successfully updated.',
    type: Trip,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized / Token expired.' })
  @ApiNotFoundResponse({ description: 'Trip not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a trip by ID (requires authentication)' })
  @ApiParam({ name: 'id', description: 'Trip ID', type: Number })
  @ApiOkResponse({
    description: 'The trip has been successfully deleted.',
    type: Trip,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized / Token expired.' })
  @ApiNotFoundResponse({ description: 'Trip not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

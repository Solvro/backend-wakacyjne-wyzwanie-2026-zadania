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
  Req,
  UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripService: TripsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiResponse({
    status: 201,
    description: 'The trip has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad request (validation error)' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - the token is invalid, expired, or missing',
  })
  async create(
    @Body() createTripDto: CreateTripDto,
    @Req() req: { user: User },
  ) {
    return await this.tripService.create(createTripDto, req.user.uuid);
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
    status: 401,
    description: 'Unauthorized - the token is invalid, expired, or missing',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (only the owner can update)',
  })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateTripDto: UpdateTripDto,
    @Req() req: { user: User },
  ) {
    return await this.tripService.update(uuid, updateTripDto, req.user.uuid);
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
    status: 401,
    description: 'Unauthorized - the token is invalid, expired, or missing',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (only the owner can delete)',
  })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Req() req: { user: User },
  ) {
    await this.tripService.remove(uuid, req.user.uuid);
  }
}

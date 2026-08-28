import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import type { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Participant } from './entities/participant.entity';

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new participant',
    description:
      'Adds a participant to the database. New participants must be assigned to an existing trip',
  })
  @ApiResponse({
    status: 201,
    description: 'The participant has been successfully created',
    type: Participant,
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all participants',
    description: 'Lists all participants in the database',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all participants',
    type: [Participant],
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a participant',
    description: 'Retrieves a single participant by their ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The participant with the given ID',
    type: Participant,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a participant',
    description:
      'Updates a participant by their ID. If the trip is changed, the new trip must exist. If the trip or email is changed, the email must not already be in use by another participant of the resulting trip',
  })
  @ApiResponse({
    status: 200,
    description: 'The participant has been successfully updated',
    type: Participant,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a participant',
    description: 'Removes a participant from the database by their ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The participant has been successfully deleted',
    type: Participant,
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

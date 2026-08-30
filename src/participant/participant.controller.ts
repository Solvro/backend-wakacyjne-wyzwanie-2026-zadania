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
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new participant',
    description: 'Add a participant to the database.',
  })
  @ApiResponse({
    status: 201,
    description: 'The participant has been successfully created.',
    type: CreateParticipantDto,
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve a list of participants',
    description: 'Retrieves a list of participants from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of participants has been successfully retrieved.',
    type: [CreateParticipantDto],
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a participant by ID',
    description:
      'Retrieves a participant by their unique ID from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'The participant has been successfully retrieved.',
    type: CreateParticipantDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a participant by ID',
    description: 'Updates a participant by their unique ID from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'The participant has been successfully updated.',
    type: UpdateParticipantDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a participant by ID',
    description: 'Deletes a participant by their unique ID from the database.',
  })
  @ApiResponse({
    status: 204,
    description: 'The participant has been successfully deleted.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(+id);
  }
}

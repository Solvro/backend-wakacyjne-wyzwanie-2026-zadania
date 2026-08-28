import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateParticipantResponseDto } from './dto/create-participant-response.dto';

@Controller('participants')
@ApiTags("participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) { }

  @Post()
  @ApiOperation({
    summary: "Create new participant",
    description: "Create new participant with name, surname, email, trip id and optionally joining date"
  })
  @ApiResponse({
    status: 201,
    description: "Participant created successfully",
    type: [CreateParticipantResponseDto]
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all participants",
    description: "Retrieve a list of all participants"
  })
  @ApiResponse({
    status: 200,
    description: "List retrieved successfully",
    type: [CreateParticipantResponseDto]
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get participant by ID",
    description: "Retrive a participant by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Participant retrieved successfully",
    type: [CreateParticipantResponseDto]
  })
  @ApiResponse({
    status: 404,
    description: " Participant not found"
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: "Update participant by ID",
    description: "Update a participant by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Participant updated successfully",
    type: [CreateParticipantResponseDto]
  })
  @ApiResponse({
    status: 404,
    description: " Participant not found"
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete participant by ID",
    description: "Delete a participant by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Participant deleted successfully",
    type: [CreateParticipantResponseDto]
  })
  @ApiResponse({
    status: 404,
    description: " Participant not found"
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

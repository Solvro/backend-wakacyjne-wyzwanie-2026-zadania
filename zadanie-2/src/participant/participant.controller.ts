import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@Controller('participant')
@ApiTags('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create a new participant',
    description: 'Create a new participant containing: first name, last name and passport number (optional).'
  })
  @ApiResponse({
    status: 201,
    description: "Participant created succesfully."
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all participants',
    description: 'Retrieves a list of all participants from the database'
  })
  @ApiResponse({
    status: 200,
    description: 'List retrieved succesfully'
  })
  async findAll() {
    return this.participantService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({
    summary: 'Get one participant',
    description: 'Retrieves a participant with a given unique ID from the database'
  })
  @ApiResponse({
    status: 200,
    description: 'Participant retrieved succesfully'
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found"
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update participant by ID',
    description: "Update a participant's data by their unique ID"
  })
  @ApiResponse({
    status: 200,
    description: "Participant's data updated succesfully"
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found"
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete participant by ID',
    description: 'Deletes a participant with a given unique ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Participant deleted succesfully'
  })
  @ApiResponse({
    status: 404,
    description: "Participant not found"
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

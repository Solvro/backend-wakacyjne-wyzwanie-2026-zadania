import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ParticipantResponseDto } from './dto/response-participant.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Participant')
@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new participant' })
  @ApiResponse({ status: 201, description: 'The participant has been successfully created.', type: ParticipantResponseDto })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all participants' })
  @ApiResponse({ status: 200, description: 'List of all participants.', type: [ParticipantResponseDto] })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a participant by ID' })
  @ApiResponse({ status: 200, description: 'The participant with the specified ID.', type: ParticipantResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a participant by ID' })
  @ApiResponse({ status: 200, description: 'The participant with the specified ID has been updated.', type: ParticipantResponseDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a participant by ID' })
  @ApiResponse({ status: 200, description: 'The participant with the specified ID has been deleted.', type: ParticipantResponseDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

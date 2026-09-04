import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser } from '../auth/jwt.strategy';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participants')
@ApiTags('participants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  @ApiOperation({ summary: 'List all participants' })
  @ApiResponse({ status: 200, description: 'Participants returned successfully.' })
  findAll(@Req() request: Request & { user: AuthenticatedUser }) {
    return this.participantsService.findAll(request.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a participant' })
  @ApiResponse({ status: 201, description: 'Participant created successfully.' })
  create(@Req() request: Request & { user: AuthenticatedUser }, @Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(request.user.id, createParticipantDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a participant by ID' })
  @ApiResponse({ status: 200, description: 'Participant returned successfully.' })
  @ApiResponse({ status: 404, description: 'Participant not found.' })
  findOne(@Req() request: Request & { user: AuthenticatedUser }, @Param('id', ParseIntPipe) id: number) {
    return this.participantsService.findOne(request.user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a participant' })
  @ApiResponse({ status: 200, description: 'Participant updated successfully.' })
  @ApiResponse({ status: 404, description: 'Participant not found.' })
  update(@Req() request: Request & { user: AuthenticatedUser }, @Param('id', ParseIntPipe) id: number, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantsService.update(request.user.id, id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a participant' })
  @ApiResponse({ status: 200, description: 'Participant deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Participant not found.' })
  remove(@Req() request: Request & { user: AuthenticatedUser }, @Param('id', ParseIntPipe) id: number) {
    return this.participantsService.remove(request.user.id, id);
  }
}
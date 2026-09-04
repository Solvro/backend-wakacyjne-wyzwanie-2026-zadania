import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomJwtGuard } from '../auth/custom-jwt.guard';

@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @UseGuards(CustomJwtGuard)
  @Post()
  @ApiOperation({summary: "Add a new participant"})
  @ApiResponse({status: 201, description: "The participant has been successfully created."})
  @ApiResponse({status: 400, description: "Bad request."})
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({summary: "Get all participants"})
  @ApiResponse({status: 200, description: "Return all participants."})
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: "Get a participant with given ID"})
  @ApiResponse({status: 200, description: "Return the participant."})
  @ApiResponse({status: 404, description: "Participant not found."})
  findOne(@Param('id') id: string) {
    return this.participantService.findOne(+id);
  }

  @UseGuards(CustomJwtGuard)
  @Patch(':id')
  @ApiOperation({summary: "Update a participant with given ID"})
  @ApiResponse({status: 200, description: "The participant has been successfully updated."})
  @ApiResponse({status: 400, description: "Bad request."})
  @ApiResponse({status: 404, description: "Participant not found."})
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(+id, updateParticipantDto);
  }
  
  @UseGuards(CustomJwtGuard)
  @Delete(':id')
  @ApiOperation({summary: "Delete a participant with given ID"})
  @ApiResponse({status: 200, description: "The participant has been successfully deleted."})
  @ApiResponse({status: 404, description: "Participant not found."})
  remove(@Param('id') id: string) {
    return this.participantService.remove(+id);
  }
}

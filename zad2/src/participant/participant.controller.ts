import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({
      summary: "Insert a new participant",
      description: "Insert a new entry of a participant into the database",
    })
    @ApiResponse({
      status: 201,
      description: "Participant inserted succesfully"
    })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
   @ApiOperation({
      summary: "Get all participants",
      description: "Retrieve all the participants from the database",
    })
    @ApiResponse({
      status: 200,
      description: "Participants received succesfully",
      type: [CreateParticipantDto],
    })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({
      summary: "Get participant on given id",
      description: "Retrieve the participant with a given id from the database",
    })
    @ApiResponse({
      status: 200,
      description: "Participant received succesfully",
      type: [CreateParticipantDto],
    })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
      summary: "Change values of a given participant",
      description: "Change the values of a participant with a given id in the database",
    })
    @ApiResponse({
      status: 200,
      description: "Participant updated succesfully",
      type: [UpdateParticipantDto],
    })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Remove participant on given id",
    description: "Remove the participant with a given id from the database",
  })
  @ApiResponse({
    status: 200,
    description: "Participant removed succesfully",
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

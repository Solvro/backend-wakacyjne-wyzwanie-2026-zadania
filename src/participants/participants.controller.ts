import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participants')
@ApiTags('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  @ApiOperation({ summary: 'List all participants' })
  @ApiResponse({ status: 200, description: 'Participants returned successfully.' })
  findAll() {
    return this.participantsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a participant' })
  @ApiResponse({ status: 201, description: 'Participant created successfully.' })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a participant by ID' })
  @ApiResponse({ status: 200, description: 'Participant returned successfully.' })
  @ApiResponse({ status: 404, description: 'Participant not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a participant' })
  @ApiResponse({ status: 200, description: 'Participant updated successfully.' })
  @ApiResponse({ status: 404, description: 'Participant not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantsService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a participant' })
  @ApiResponse({ status: 200, description: 'Participant deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Participant not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.remove(id);
  }
}
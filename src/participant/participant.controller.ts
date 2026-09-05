import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('participants')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 201,
    description: 'The participant has been successfully created.',
  })
  @ApiOperation({ summary: 'Create a new participant' })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all participants' })
  @ApiOperation({ summary: 'Get all participants' })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a participant by ID' })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  @ApiOperation({ summary: 'Get a participant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the participant', type: Number })
  findOne(@Param('id') id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The participant has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  @ApiOperation({ summary: 'Update a participant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the participant', type: Number })
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The participant has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  @ApiOperation({ summary: 'Delete a participant by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the participant', type: Number })
  remove(@Param('id') id: string) {
    return this.participantService.remove(+id);
  }
}

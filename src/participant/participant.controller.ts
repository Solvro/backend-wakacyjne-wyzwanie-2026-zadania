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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Participants')
@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({ summary: 'Create new Participant' })
  @ApiResponse({ status: 201, description: 'Participant created successfully' })
  @ApiResponse({ status: 400, description: 'Error: invalid data' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of all participants' })
  @ApiResponse({ status: 200, description: 'List of participants' })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Participant by ID' })
  @ApiResponse({ status: 200, description: 'Participant found' })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update participant information' })
  @ApiResponse({
    status: 200,
    description: 'Participant successfully updated',
  })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Participant' })
  @ApiResponse({
    status: 200,
    description: 'Participant successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

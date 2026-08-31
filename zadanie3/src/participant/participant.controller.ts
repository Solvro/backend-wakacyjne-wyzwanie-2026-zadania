import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParseIntPipe} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('participant')
@ApiTags('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new participant',
    description: 'Add a new participant to the database'
  })
  @ApiResponse({
    status: 201,
    description: 'The new participant was successfully added to the database',
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrive the list of all participants',
    description: 'Retrive the list of all participants from the database'
  })
  @ApiResponse({
    status: 200,
    description: 'The list of all participants was successfully retrived',
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrive the participant with chosen ID',
    description: 'Retrive the participant with chosen ID from the database'
  })
  @ApiResponse({
    status: 200,
    description: 'The participant was successfully retrived',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update the participant with chosen ID',
    description: 'Update and save the changed information about the participant with chosen ID'
  })
  @ApiResponse({
    status: 200,
    description: 'The information was successfully changed',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete the participant with chosen ID',
    description: 'Delete the participant with chosen ID from the database'
  })
  @ApiResponse({
    status: 204,
    description: 'The participant was successfully deleted from the database',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}


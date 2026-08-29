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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('participant')
@ApiTags('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new participant',
  })
  @ApiResponse({
    status: 201,
    description: 'Participant created successfully',
  })
  async create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all participants',
  })
  @ApiResponse({
    status: 200,
    description: 'List retrieved successfully',
  })
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get participant by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Participant retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Participant not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update participant by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Participant updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Participant not found',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete participant by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Participant deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Participant not found',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

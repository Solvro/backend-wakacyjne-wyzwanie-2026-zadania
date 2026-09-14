import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ParticipantsService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@ApiTags('Participants')
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a participant' })
  create(@Body() dto: CreateParticipantDto) {
    return this.participantsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all participants' })
  findAll() {
    return this.participantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get participant by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a participant' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateParticipantDto) {
    return this.participantsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a participant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.remove(id);
  }
}
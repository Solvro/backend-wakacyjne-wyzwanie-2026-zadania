import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ParticipantResponseDto } from './dto/reponse-participant.dto';

@ApiTags("participants")
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({description:"Create a participant"})
  @ApiResponse({status:201, description:"Participant created successfully"})
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiResponse({status:200, type:ParticipantResponseDto})
  @ApiOperation({description:"Get all participants"})
  findAll(@Query('page') page:number, @Query('limit') limit:number) {
    return this.participantService.findAll(page, limit);
  }

  @Get(':id')
  @ApiResponse({status:200, type:ParticipantResponseDto})
  @ApiOperation({description:"Get participant by ID"})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({description:"Update participant by ID"})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({description:"Delete participant by ID"})
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.participantService.remove(+id);
  }
}

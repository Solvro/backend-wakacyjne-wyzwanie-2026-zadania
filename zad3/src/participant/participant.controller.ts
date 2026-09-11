import { Controller, Get, Post, Body, Patch, Param, Delete , ValidationPipe, UsePipes, ParseIntPipe} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Participants')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  @ApiOperation({ summary: 'Create a new participant' })
  @ApiResponse({ status: 201, description: 'The participant has been successfully created.' }) 
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid data provided.' })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all participants' })
  @ApiResponse({ status: 200, description: 'Returns an array of all participants.' })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single participant by their ID' })
  @ApiResponse({ status: 200, description: 'Returns the found participant.' })
  @ApiResponse({ status: 404, description: 'Participant with the given ID was not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({whitelist: true}))
  @ApiOperation({ summary: 'Update an existing participant' })
  @ApiResponse({ status: 200, description: 'The participant has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid data provided.' })
  @ApiResponse({ status: 404, description: 'Participant with the given ID was not found.' })
  update(@Param('id',ParseIntPipe) id: number, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a participant by their ID' })
  @ApiResponse({ status: 200, description: 'The participant has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Participant with the given ID was not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

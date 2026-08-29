import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './entities/participant.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('participants')
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new participant' })
  @ApiCreatedResponse({
    description: 'The participant has been successfully created.',
    type: Participant,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all participants with pagination' })
  @ApiOkResponse({
    description: 'Paginated list of participants.',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.participantsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a participant by ID' })
  @ApiParam({ name: 'id', description: 'Participant ID', type: Number })
  @ApiOkResponse({
    description: 'The participant details.',
    type: Participant,
  })
  @ApiNotFoundResponse({ description: 'Participant not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a participant by ID' })
  @ApiParam({ name: 'id', description: 'Participant ID', type: Number })
  @ApiOkResponse({
    description: 'The participant has been successfully updated.',
    type: Participant,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiNotFoundResponse({ description: 'Participant not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantsService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a participant by ID' })
  @ApiParam({ name: 'id', description: 'Participant ID', type: Number })
  @ApiOkResponse({
    description: 'The participant has been successfully deleted.',
    type: Participant,
  })
  @ApiNotFoundResponse({ description: 'Participant not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.remove(id);
  }
}

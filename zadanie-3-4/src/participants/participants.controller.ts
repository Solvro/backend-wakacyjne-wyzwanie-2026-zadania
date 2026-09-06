import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/entities/user.entity';

@ApiTags('Participants')
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new participant to a trip' })
  @ApiResponse({
    status: 201,
    description: 'The participant has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad request (validation error)' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - the token is invalid, expired, or missing',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (only the trip owner can add participants)',
  })
  @ApiResponse({ status: 404, description: 'Trip or user not found' })
  @ApiResponse({
    status: 409,
    description: 'Conflict (user is already a participant)',
  })
  async create(
    @Body() createParticipantDto: CreateParticipantDto,
    @Req() req: { user: User },
  ) {
    return await this.participantsService.create(
      createParticipantDto,
      req.user.uuid,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all participants' })
  @ApiResponse({ status: 200, description: 'Return all participants' })
  async findAll() {
    return await this.participantsService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get a participant by UUID' })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'UUID of the participant',
  })
  @ApiResponse({ status: 200, description: 'Return the participant' })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  async findOne(@Param('uuid') uuid: string) {
    return await this.participantsService.findOne(uuid);
  }

  @Patch(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a participant nickname by UUID' })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'UUID of the participant to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The participant has been successfully updated',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - the token is invalid, expired, or missing',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (only the owner or self can update)',
  })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
    @Req() req: { user: User },
  ) {
    return await this.participantsService.update(
      uuid,
      updateParticipantDto,
      req.user.uuid,
    );
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a participant from a trip by UUID' })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    format: 'uuid',
    description: 'UUID of the participant to remove',
  })
  @ApiResponse({
    status: 204,
    description: 'The participant has been successfully removed',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - the token is invalid, expired, or missing',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Participant not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('uuid') uuid: string, @Req() req: { user: User }) {
    await this.participantsService.remove(uuid, req.user.uuid);
  }
}

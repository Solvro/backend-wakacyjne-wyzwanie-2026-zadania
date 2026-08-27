import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  async create(
    @Body() createParticipantDto: CreateParticipantDto,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    return await this.participantsService.create(
      createParticipantDto,
      currentUser,
    );
  }

  @Get()
  async findAll() {
    return await this.participantsService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    return await this.participantsService.findOne(uuid);
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    return await this.participantsService.update(
      uuid,
      updateParticipantDto,
      currentUser,
    );
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('uuid') uuid: string,
    @Query('currentUser', ParseUUIDPipe) currentUser: string, // delete after implementing authentication
  ) {
    await this.participantsService.remove(uuid, currentUser);
  }
}

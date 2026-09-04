import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Inject, UseGuards } from '@nestjs/common';
import { TripParticipantsService } from './trip_participants.service';
import { CreateTripParticipantDto } from './dto/create-trip_participant.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('trip-participants')
export class TripParticipantsController {
  constructor(@Inject(TripParticipantsService) private tripParticipantsService: TripParticipantsService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  create(@Body() createTripParticipantDto: CreateTripParticipantDto) {
    return this.tripParticipantsService.create(createTripParticipantDto);
  }

  @Get()
  findAll() {
    return this.tripParticipantsService.findAll();
  }

  @Get('trip/:id')
  findByTripId(@Param('id', ParseIntPipe) id: number) {
    return this.tripParticipantsService.findByTripId(+id);
  }

  @Get('person/:id')
  findByPersonId(@Param('id', ParseIntPipe) id: number) {
    return this.tripParticipantsService.findByPersonId(+id);
  }

  @Delete(':tripId/:personId')
  @UseGuards(LocalAuthGuard)
  remove(@Param('id', ParseIntPipe) tripId: number, @Param('id', ParseIntPipe) personId: number) {
    return this.tripParticipantsService.remove(+tripId, +personId);
  }
}

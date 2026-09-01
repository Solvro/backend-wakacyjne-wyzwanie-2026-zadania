import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject } from '@nestjs/common';
import { TripParticipantsService } from './trip_participants.service';
import { CreateTripParticipantDto } from './dto/create-trip_participant.dto';
import { UpdateTripParticipantDto } from './dto/update-trip_participant.dto';

@Controller('trip-participants')
export class TripParticipantsController {
  constructor(@Inject(TripParticipantsService) private tripParticipantsService: TripParticipantsService) {}

  @Post()
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
  remove(@Param('id', ParseIntPipe) tripId: number, @Param('id', ParseIntPipe) personId: number) {
    return this.tripParticipantsService.remove(+tripId, +personId);
  }
}

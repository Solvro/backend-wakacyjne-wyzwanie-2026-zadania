import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @ApiOperation({
    summary: 'Utwórz nową wycieczkę',
  })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Pobierz listę wszystkich wycieczk',
  })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Pobierz wycieczkę po danym ID',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }
  @Patch(':id')
  @ApiOperation({
    summary: 'Zaktualizuj wycieczkę',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripService.update(id, updateTripDto);
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'Usuń wycieczkę',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

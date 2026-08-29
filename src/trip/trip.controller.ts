import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripResponseDto } from './dto/trip-response.dto';

@ApiTags('trips')
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wszystkich wycieczek' })
  @ApiOkResponse({
    description: 'Lista wszystkich wycieczek wraz z powiązanymi uczestnikami i wydatkami',
    type: [TripResponseDto],
  })
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz szczegóły wycieczki po ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID wycieczki' })
  @ApiOkResponse({
    description: 'Szczegóły znalezionej wycieczki',
    type: TripResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Wycieczka o podanym ID nie istnieje' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Utwórz nową wycieczkę' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Wycieczka została pomyślnie utworzona',
    type: TripResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Błąd walidacji danych' })
  create(@Body() dto: CreateTripDto) {
    return this.tripService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Zaktualizuj dane wycieczki' })
  @ApiParam({ name: 'id', type: Number, description: 'ID wycieczki' })
  @ApiOkResponse({
    description: 'Wycieczka została pomyślnie zaktualizowana',
    type: TripResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Wycieczka o podanym ID nie istnieje' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Błąd walidacji danych' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTripDto) {
    return this.tripService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Usuń wycieczkę' })
  @ApiParam({ name: 'id', type: Number, description: 'ID wycieczki' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Wycieczka została pomyślnie usunięta',
  })
  @ApiNotFoundResponse({ description: 'Wycieczka o podanym ID nie istnieje' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({
    summary: 'Utwórz nowego uczestnika',
  })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Pobierz listę wszystkich uczestników',
  })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Pobierz uczestnika po danym ID',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }
  @Patch(':id')
  @ApiOperation({
    summary: 'Zaktualizuj uczestnika',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'Usuń uczestnika',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}

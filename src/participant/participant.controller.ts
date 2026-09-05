import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({
      summary: "Tworzy nowego uczestnika",
      description: "Tworzy nowego uczestnika, z imieniem, nazwiskiem, emailem, peselem, numerem, telefonu"
    })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOperation({
    summary: "Pobiera wszystkich uczestników"
  })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: "Pobiera konkretnego uczestnika",
    description: "Pobiera uczestnika przez jego id"
  })
  findOne(@Param('id') id: string) {
    return this.participantService.findOne(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  @ApiOperation({
    summary: "Modyfikuje konkretnego uczestnika",
    description: "Modyfikuje konkretnego uczestnika przez podanie jego id"
  })
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(+id, updateParticipantDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiOperation({
    summary: "Usuwa uczestnika"
  })
  remove(@Param('id') id: string) {
    return this.participantService.remove(+id);
  }
}

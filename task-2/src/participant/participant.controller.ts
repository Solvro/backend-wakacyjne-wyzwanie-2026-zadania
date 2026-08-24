import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParticipantDto } from './dto/CreateParticipantDto';

@Controller('participant')
export class ParticipantController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll() {
    return this.prisma.participant.findMany();
  }

  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({
      data: {
        firstName: createParticipantDto.firstName,
        lastName: createParticipantDto.lastName,
        email: createParticipantDto.email,
        adult: createParticipantDto.isAdult,
      },
    });
  }
}

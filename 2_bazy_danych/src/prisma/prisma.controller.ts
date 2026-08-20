import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Sex } from '@prisma/client';

@Controller('participants')
export class PrismaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAllParticipants() {
    return this.prisma.participant.findMany({
      include: {
        trips: true,
        expenses: true,
      },
    });
  }

  @Post()
  async createParticipant(
    @Body()
    dto: {
      name: string;
      surname: string;
      sex?: Sex;
      birth_date?: string;
    },
  ) {
    return this.prisma.participant.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        sex: dto.sex,
        birth_date: dto.birth_date ? new Date(dto.birth_date) : undefined,
      },
    });
  }
}
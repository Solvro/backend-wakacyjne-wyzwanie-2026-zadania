import {
  Controller,
  Delete,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('prisma')
export class PrismaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('participants')
  getParticipants() {
    return this.prisma.participant.findMany();
  }

  @Delete('participant')
  deleteParticipant() {
    return this.prisma.$transaction(async (transaction) => {
      const participant = await transaction.participant.findFirst({
        orderBy: {
          id: 'desc',
        },
      });

      if (!participant) {
        throw new NotFoundException('Brak uczestników do usunięcia');
      }

      await transaction.expense.deleteMany({
        where: {
          participant_id: participant.id,
        },
      });

      await transaction.participantTrip.deleteMany({
        where: {
          participant_id: participant.id,
        },
      });
      
      return transaction.participant.delete({
        where: {
          id: participant.id,
        },
      });
    });
  }
}
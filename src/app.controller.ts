import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-db')
  async testDb() {
    const tripsCount = await this.prisma.trip.count();
    const participantsCount = await this.prisma.participant.count();
    const expensesCount = await this.prisma.expense.count();

    return {
      status: 'connected',
      counts: {
        trips: tripsCount,
        participants: participantsCount,
        expenses: expensesCount,
      },
    };
  }
}
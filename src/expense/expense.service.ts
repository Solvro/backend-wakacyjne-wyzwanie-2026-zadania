import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  findAll(tripId?: number, paidById?: number) {
    return this.prisma.expense.findMany({
      where: {
        ...(tripId && { tripId }),
        ...(paidById && { paidById }),
      },
      include: {
        trip: true,
        paidBy: true,
      },
    });
  }

  async findOne(id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: {
        trip: true,
        paidBy: true,
      },
    });

    if (!expense) {
      throw new NotFoundException(`Wydatek o ID ${id} nie istnieje`);
    }

    return expense;
  }

  async create(dto: CreateExpenseDto) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: dto.tripId },
    });
    if (!trip) {
      throw new NotFoundException(`Wycieczka o ID ${dto.tripId} nie istnieje`);
    }

    const participant = await this.prisma.participant.findUnique({
      where: { id: dto.paidById },
    });
    if (!participant) {
      throw new NotFoundException(
        `Uczestnik o ID ${dto.paidById} nie istnieje`,
      );
    }

    if (participant.tripId !== dto.tripId) {
      throw new BadRequestException(
        'Płacący uczestnik musi należeć do wycieczki, której dotyczy wydatek',
      );
    }

    return this.prisma.expense.create({
      data: {
        title: dto.title,
        amount: dto.amount,
        description: dto.description,
        tripId: dto.tripId,
        paidById: dto.paidById,
      },
      include: {
        trip: true,
        paidBy: true,
      },
    });
  }

  async update(id: number, dto: UpdateExpenseDto) {
    const existing = await this.findOne(id);

    const targetTripId = dto.tripId ?? existing.tripId;
    const targetPaidById = dto.paidById ?? existing.paidById;

    if (dto.tripId) {
      const trip = await this.prisma.trip.findUnique({
        where: { id: dto.tripId },
      });
      if (!trip) {
        throw new NotFoundException(`Wycieczka o ID ${dto.tripId} nie istnieje`);
      }
    }

    if (dto.paidById) {
      const participant = await this.prisma.participant.findUnique({
        where: { id: dto.paidById },
      });
      if (!participant) {
        throw new NotFoundException(
          `Uczestnik o ID ${dto.paidById} nie istnieje`,
        );
      }
      if (participant.tripId !== targetTripId) {
        throw new BadRequestException(
          'Płacący uczestnik musi należeć do wycieczki, której dotyczy wydatek',
        );
      }
    }

    return this.prisma.expense.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.amount !== undefined && { amount: dto.amount }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.tripId && { tripId: dto.tripId }),
        ...(dto.paidById && { paidById: dto.paidById }),
      },
      include: {
        trip: true,
        paidBy: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.expense.delete({
      where: { id },
    });
  }
}

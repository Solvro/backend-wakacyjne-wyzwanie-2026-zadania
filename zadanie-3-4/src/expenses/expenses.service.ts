import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto, currentUserUuid: string) {
    const trip = await this.prisma.trip.findUnique({
      where: { uuid: createExpenseDto.tripUuid },
      include: { participants: true },
    });

    if (!trip) {
      throw new NotFoundException(
        `Trip with UUID "${createExpenseDto.tripUuid}" not found.`,
      );
    }

    const isOwner = trip.createdByUuid === currentUserUuid;
    const isParticipant = trip.participants.some(
      (participant) => participant.userUuid === currentUserUuid,
    );

    if (!isOwner && !isParticipant) {
      throw new ForbiddenException(
        'You do not have permission to add expense to this trip.',
      );
    }

    const payerUuid = createExpenseDto.payerUuid || currentUserUuid;

    const isPayerValid =
      payerUuid === trip.createdByUuid ||
      trip.participants.some(
        (participant) => participant.userUuid === payerUuid,
      );

    if (!isPayerValid) {
      throw new BadRequestException(
        'The specified payer is not a participant of this trip.',
      );
    }

    return await this.prisma.expense.create({
      data: {
        ...createExpenseDto,
        payerUuid,
      },
    });
  }

  async findAll() {
    return await this.prisma.expense.findMany();
  }

  async findOne(uuid: string) {
    const expense = await this.prisma.expense.findUnique({
      where: { uuid },
      include: {
        trip: true,
        payer: {
          select: {
            uuid: true,
            nicknameInTrip: true,
            user: {
              select: {
                uuid: true,
                email: true,
                name: true,
                surname: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!expense) {
      throw new NotFoundException(`Trip with UUID "${uuid}" not found.`);
    }

    return expense;
  }

  async update(
    uuid: string,
    updateExpenseDto: UpdateExpenseDto,
    currentUserUuid: string,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      const expense = await tx.expense.findUnique({
        where: { uuid },
        include: {
          trip: {
            include: {
              participants: true,
            },
          },
        },
      });

      if (!expense) {
        throw new NotFoundException(`Expense with UUID "${uuid}" not found.`);
      }

      const isTripOwner = expense.trip.createdByUuid === currentUserUuid;
      const isPayer = expense.payerUuid === currentUserUuid;

      if (!isTripOwner && !isPayer) {
        throw new ForbiddenException(
          'You do not have permission to update this expense.',
        );
      }

      if (
        updateExpenseDto.payerUuid &&
        updateExpenseDto.payerUuid !== expense.payerUuid
      ) {
        const isNewPayerValid =
          updateExpenseDto.payerUuid === expense.trip.createdByUuid ||
          expense.trip.participants.some(
            (participant) =>
              participant.userUuid === updateExpenseDto.payerUuid,
          );

        if (!isNewPayerValid) {
          throw new BadRequestException(
            'The specified new payer is not a participant of this trip.',
          );
        }
      }

      return await tx.expense.update({
        where: { uuid },
        data: updateExpenseDto,
      });
    });
  }

  async remove(uuid: string, currentUserUuid: string) {
    const expense = await this.prisma.expense.findUnique({
      where: { uuid },
      include: {
        trip: true,
      },
    });

    if (!expense) {
      throw new NotFoundException(`Expense with UUID "${uuid}" not found.`);
    }

    const isTripOwner = expense.trip.createdByUuid === currentUserUuid;
    const isPayer = expense.payerUuid === currentUserUuid;

    if (!isTripOwner && !isPayer) {
      throw new ForbiddenException(
        'You do not have permission to delete this expense.',
      );
    }

    return await this.prisma.expense.delete({
      where: { uuid },
    });
  }
}

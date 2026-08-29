import { Injectable } from "@nestjs/common";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TripService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTripDto: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        ...createTripDto,
        date: new Date(createTripDto.date),
      },
    });
  }

  async findAll(offset: number, limit: number) {
    return this.prisma.trip.findMany({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    return this.prisma.trip.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    return this.prisma.trip.update({
      where: { id },
      data: {
        ...updateTripDto,
        ...(updateTripDto.date && {
          date: new Date(updateTripDto.date),
        }),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.trip.delete({
      where: { id },
    });
  }
}

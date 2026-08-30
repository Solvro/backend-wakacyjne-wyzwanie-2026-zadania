import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TripService {
  constructor(private databaseService: DatabaseService) {}

  create(createTripDto: CreateTripDto) {
    return this.databaseService.trip.create({
      data: createTripDto,
    });
  }

  findAll() {
    return this.databaseService.trip.findMany();
  }

  async findOne(id: number) {
    const trip = await this.databaseService.trip.findUnique({
      where: { id },
    });
    if (!trip) {
      throw new NotFoundException(`Nie znaleziono wycieczki o ID ${id}`);
    }
    return trip;
  }

  async update(id: number, updateTripDto: UpdateTripDto) {
    await this.findOne(id);
    return this.databaseService.trip.update({
      where: { id },
      data: updateTripDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseService.trip.delete({
      where: { id },
    });
  }
}